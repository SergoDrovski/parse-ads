const mongoose = require('mongoose');
const config = require("../config/index.js");

async function connectDb() {
    try{
        await mongoose.connect(config.get('mongoose:uri'));
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        console.log(err);
        return new Error('error connect Db')
    }
}
async function disconnectDb() {
    try{
        await mongoose.disconnect();
        console.log("Подключение закрыто...");
    }
    catch(err) {
        console.log(err);
        return new Error('error disconnect Db');
    }
}

exports.connectDb = connectDb;
exports.disconnectDb = disconnectDb;
// mongoose.connect(config.get('mongoose:uri'));
//
// module.exports = mongoose;