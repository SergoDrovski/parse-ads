const express = require('express');
const authController = require("../controllers/authController.js");

const authRouter = express.Router();


authRouter.post('/login', authController.loginUser);
authRouter.post('/logout', authController.logoutUser);
// authRouter.post('/reg', authController.regUser);


module.exports = authRouter;
