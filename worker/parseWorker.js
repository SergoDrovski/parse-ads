const { workerData, parentPort } = require('node:worker_threads')
const { connectDb, disconnectDb } = require('../libs/mongoos.js');
const { parse } = require('../libs/parser/parse.js');
const UrlNew = require('../models/urlNew.js').model;
const UrlCompl = require('../models/urlCopleted.js').model;
const Task = require('../models/task.js').model;

parentPort.on('message', (idTask) => {
			console.log('Запуск основной работы воркера')	
        //Запуск основной работы воркера
        main(idTask).then((data)=>{
            parentPort.postMessage(data);
        }).catch((err) => {
            parentPort.postMessage(new Error(`ошибка в запуске основной работы: ${err.message}`));
        });
});

async function main(idTask) {
	await connectDb();
    //Делим задачу на итерации
	 const part = 1;
    const countUrl =  await UrlNew.count();
    // let iterate = Math.ceil(countUrl/part);
    let iterate = 1;
    let logError = [];
    let statusTask;

    while(iterate > 0) {
        await runPartTask(idTask, part)
            .then((task)=>{
                iterate--;
            })
            .catch((err)=>{
                iterate = 0;
                logError.push(err)
        });
    }
	 
    statusTask = logError.length !== 0 ? "failed" : "completed";
    const errorMess = logError.length !== 0 ? logError.pop().message : "";
	 
    const updateTask = await updateTaskInDb(idTask, statusTask, errorMess);
	 await disconnectDb();
	 return updateTask;
}

async function runPartTask(idTask, part) {
    try {
        //Получаем часть урлов
        let urlDoc =  await UrlNew.find({}).limit(part);

        if(urlDoc.length === 0) {
            throw new Error('отсутсвуют данные в db')
        }

        let urlDocToObj = urlDoc.map((elem)=>{
            return elem.toObject();
        })

        //Производим парсинг
        let resParse =  await parse(urlDocToObj);


        if(resParse.length === 0) {
            throw new Error('Нет результата от парсинга')
        }

        let urlCompleted = resParse.map((elem)=>{
            elem.task_id = idTask._id;
            return elem
        })

        // console.log(urlCompleted)
        //Записываем  ссылки в базу
        await UrlCompl.insertMany(urlCompleted).catch(function(error){
            console.log(error)
            throw new Error('Ошибка записи резулт парс')
        });

        //Если всё ок удаляем старые
        let removeIdsArray = urlDoc.map(function(doc) { return doc._id; });
        await UrlNew.deleteMany({_id: {$in: removeIdsArray}}).catch(function(error){
            console.log(error)
            throw new Error('Ошибка удаления обработанных урлов')
        });

    } catch (err){
        throw err;
    }
}

async function updateTaskInDb(idTask, status, error){
    const urlCompl = await UrlCompl.find({ task_id: idTask._id });

    //колличество содержащих код ссылок
    const countUrlAdsExist = urlCompl.filter(elem => elem.ads_exist).length;

    const task = {
        completed: Date.now(),
        status: status,
        urls: urlCompl.length,
        ads_exist: countUrlAdsExist,
        ads_not_exist: urlCompl.length - countUrlAdsExist,
        error: error
    }
    //частично обновляем задачу
    await Task.updateOne({ _id: idTask._id }, task).catch(function(error){
        console.log(error)
        throw new Error('Ошибка обновления задачи')
    });

    return task;
}