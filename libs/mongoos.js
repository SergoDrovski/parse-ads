const mongoose = require('mongoose');
const config = require("config");

// проверить await
function connectDb() {
    try{
		 mongoose.Promise = global.Promise;
		 mongoose.set('strictQuery', true);
		 mongoose.connect(config.get('mongoose.uri'));
		 return mongoose.connection;
	 }
    catch(err) {
        console.log(err);
        return new Error('error connect Db')
    }
}

function disconnectDb() {
	try{
		mongoose.disconnect();
		console.log("Подключение закрыто...");
	}
	catch(err) {
		console.log(err);
		return new Error('error disconnect Db');
	}
}
exports.connectDb = connectDb;
exports.disconnectDb = disconnectDb;