const { run, stopWorker, workerState} = require('../worker/createWorker.js');
const {model: UrlNew} = require("../models/urlNew");
const {schema: RespSchema} = require("../libs/resp/ResponseSchema");
const Stat = require('../models/stats.js').model;
const Task = require('../models/task.js').model;
const UrlCompl = require('../models/urlCopleted.js').model;
const { ObjectID } = require('mongodb');


exports.index = function(request, response){
    // response.render('cabinet');
	request.session.countTest = request.session.countTest + 1 || 1;
	response.status(200);
	response.json(new RespSchema(200,{res: request.session.countTest},null));
};

exports.getStats = async function(request, response){
    let dbStats = await Stat.find();
    let dbTask = await Task.find({}, '-urls_complete');
    let stat = dbStats[0];
	 response.status(200);
    response.json(new RespSchema(200,{stat, dbTask},null));
};

exports.getTaskId = async function (request, response, next) {
	try {
		const id = new ObjectID(request.params['taskId'].trim());
		await Task.findById(id, '-urls_complete').then(task => {
			response.status(200)
			if (task) {
				response.json(new RespSchema(200, task, null))
			} else response.json(new RespSchema(200, task, 'not found task in db'));
		}).catch(error => next(error));
	} catch (e) {
		return next(e);
	}
};

exports.getUrlInTask = async function(request, response, next){
	try{
		const id = new ObjectID(request.params['taskId'].trim()); 
		await UrlCompl.find({ task_id: id }).then(urlsCompl => {
			response.status(200);
			if(urlsCompl.length !== 0) {
				urlsCompl.sort(function(first, second) {
					return (first.ads_exist === second.ads_exist) ? 0 : first.ads_exist ? -1 : 1;
				});
				response.json(new RespSchema(200,urlsCompl,null));
			}else {
				response.json(new RespSchema(200,null,'not found url in Task'));
			}
		}).catch(error => next(error));
	}catch (e) {
		return next(e);
	}
};

//Проверка на уже запущенную задачу
exports.checkStartTask = async function(request, response, next){
	await Task.findOne({status: "check"}).then(task => {
		response.status(200);
		if(task) {
			response.json(new RespSchema(200,{inProcess:true}))
		} else {
			response.json(new RespSchema(200,{inProcess:false}))
		}
	}).catch(err=>{
		next(err)
	})
}

exports.startTask = async function(request, response, next){
    //Проверка наличие активной задачи
    await Task.findOne({status: "check"}).then(dbTask => {
        if(dbTask) {
			  	response.status(300);
            response.redirect(`/cabinet/task/${dbTask._id}/`)
            return true;
        } else {
			  	//Проверка наличия непровернных ссылок!
			  UrlNew.count().then(count => {
				  if(count === 0) {
					  response.status(403);
					  response.json(new RespSchema(403,null,'Нет ссылок для проверки!'));
					  return count;
				  }

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
					  response.status(200);
					  response.json(new RespSchema(200,newTask,null));
				  }).catch((err)=>{
					  if (err) return next(err);
				  });
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

    //Проверка наличие активной задачи
    const task = await Task.findOne({ status: 'check' });
    if(task) {
        await Task.updateOne({ _id: task._id }, {
            completed: Date.now(),
            status: "completed"
        }).then((data)=>{
            response.status(200);
            response.json(new RespSchema(200,data,null));
        }).catch(function(error){
            console.log(error)
            next(new Error('error update task in db'))
        });
    } else {
        response.status(404)
        response.json(new RespSchema(404,null,'Нет активных задач!'));
    }
};
