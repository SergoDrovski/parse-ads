// подключение ENV
require('dotenv').config()

// подключение express	
const express = require("express");
const config = require("config");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const RespSchema = require("./libs/resp/ResponseSchema.js").schema;
const { connectDb, disconnectDb } = require('./libs/mongoos.js');

// создаем объект приложения
const app = express();
app.set('port', config.get('port'));
app.use(cors());

//view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build-frontend')));
// app.use(express.static(path.join(__dirname, 'public')));

//подкл маршруты
// const userRouter = require("./routes/userRouter.js");
const cabinetRouter = require("./routes/cabinetRouter.js");
const integrationRouter = require("./routes/integrationRouter.js");

//Опр. маршруты
// app.use("/users", userRouter);
app.use("/cabinet", cabinetRouter);
app.use("/integration", integrationRouter);


app.use(function(err, req, res, next) {
  if(req.app.get('env') === 'development') {
    console.log(err)
    res.status(500);
    res.json(new RespSchema(500,null,err.message));
  } else {
    res.status(500);
    res.send('error');
  }
});

const startServer = () => {
	// начинаем прослушивать подключения на порту
	app.listen(config.get('port'));
	console.log(`App started on port ${config.get('port')}`)
}

connectDb()
	.on('error', console.log)
	.on('disconnected', connectDb)
	.once('open', startServer);



