const express = require('express');
const userController = require("../controllers/userController.js");
const userRouter = express.Router();


userRouter.get('/get', userController.getUsers);

module.exports = userRouter;
