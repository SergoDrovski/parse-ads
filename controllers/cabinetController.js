const { connectDb, disconnectDb } = require('../libs/mongoos.js');
const { run, stopWorker, workerState} = require('../worker/createWorker.js');
const Stat = require('../models/stats.js').model;
const Task = require('../models/task.js').model;
const UrlCompl = require('../models/urlCopleted.js').model;


exports.index = function(request, response){
    response.render('cabinet');
};

exports.getStats = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    let dbStats = await Stat.find();
    let dbTask = await Task.find({}, '-urls_complete');
    await disconnectDb();

    let stat = dbStats[0];
    response.json({stat, dbTask});
};

exports.getTaskId = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    const id = request.params['taskId'];
    const task = await Task.findById(id, '-urls_complete');
    await disconnectDb();

    if(task) response.json(task);
    else next(new Error('not found task in db'))
};

exports.getUrlInTask = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    const id = request.params['taskId'];

    const urlsCompl = await UrlCompl.find({ task_id: id });
    await disconnectDb();

    if(urlsCompl) {
        urlsCompl.sort(function(first, second) {
            return (first.ads_exist === second.ads_exist) ? 0 : first.ads_exist ? -1 : 1;
        });
        response.json(urlsCompl);
    }
    else next(new Error('not found task in db'))
};


exports.startTask = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    //Проверка наличие активной задачи
    await Task.findOne({status: "check"}).then(dbTask => {
        if(dbTask) {
            disconnectDb();
            response.redirect(`/cabinet/task/${dbTask._id}/`)
            return true;
        } else {
            //Создание задачи
            const newTask = new Task({
                status: "check",
            });

            //Сохранение
            newTask.save().then(() => {

                // Если Ок то =>
                //Создание воркера
                const idWorker = run((data)=>{
                    delete workerState[idWorker]
                    if(data instanceof Error){
                        if(data.exitCode === 1){
                            console.log(data)
                            return false;
                        }
                    }
                });

                //отпавляем задачу воркеру
                workerState[idWorker].postMessage({ _id: newTask._id.valueOf() });
                response.json(newTask);

            }).catch((err)=>{
                if (err) return next(err);
            });

        }
    });
};

exports.stopTask = async function(request, response, next){
    let idWorker = Object.keys(workerState)
    if(idWorker?.[0]) {
        workerState[idWorker[0]].terminate();
        delete workerState[idWorker[0]];
    }
    let error = await connectDb();
    if(error instanceof Error) next(error)

    //Проверка наличие активной задачи
    const task = await Task.findOne({ status: 'check' });
    if(task) {
        await Task.updateOne({ _id: task._id }, {
            completed: Date.now(),
            status: "completed"
        }).then((data)=>{
            disconnectDb();
            response.json(data);
        }).catch(function(error){
            disconnectDb();
            console.log(error)
            next(new Error('error update task in db'))
        });
    } else {
        await disconnectDb();
        response.status('404')
        response.json({ms: 'Нет активных задач!'});
    }
};
