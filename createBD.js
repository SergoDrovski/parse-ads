const async = require("async");
const {connectDb, disconnectDb} = require('./libs/mongoos.js');
const User = require('./models/user.js').model;
const UrlNew = require('./models/urlNew.js').model;
const UrlCompl = require('./models/urlCopleted.js').model;
const Task = require('./models/task.js').model;
const Stat = require('./models/stats.js').model;


async.series([
    connectDb,
    // createUsers,
    createUrlNew,
    // createStat,
    // createUrlCompl,
    // createTask,
    disconnectDb,
]).catch(err => {
    console.log(err);
    disconnectDb();
});


// function createUsers(callback){
//     const user = new User({
//         username: 'Serg',
//         password: "2apse1992"
//     });
//     user.save(function (err){
//         callback(err, user)
//     })
// }

function createUrlNew(callback) {
    const url = new UrlNew({
        url: 'https://www.mongodb.com/docs/drivers/node/current/'
    });
    url.save(function (err) {
        callback(err, url)
    })
}

// function createStat(callback){
//     const stat = new Stat({
//         all_urls: 1,
//         urls_complete: 1,
//         all_include: 0,
//         all_exclude: 1,
//     });
//     stat.save(function (err){
//         callback(err, stat)
//     })
// }
//
// function createUrlCompl(callback){
//     const urlCompl = new UrlCompl({
//         url: 'test',
//         created: Date.now()-86400000,
//         include: false,
//     });
//     urlCompl.save(function (err){
//         callback(err, urlCompl)
//     })
// }
//
// function createTask(callback){
//     const task = new Task({
//         completed: Date.now(),
//         status: "completed",
//         urls: 1,
//         include: 0,
//         exclude: 1,
//         created: Date.now()-86400000
//     });
//     task.save(function (err){
//         callback(err, task)
//     })
// }

function closeConnectDb(callback) {
    mongoose.disconnect(callback);
}