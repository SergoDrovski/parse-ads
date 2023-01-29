const User = require('../models/user.js').model;
const {schema: RespSchema} = require("../libs/resp/ResponseSchema");

exports.loadUser = async function(request, response, next){
	if(!request.session.user){
		response.status(404);
		response.json(new RespSchema(404,null,'Нет авторизации в системе!'))
		return
	}
	try{
		await User.findById(request.session.user).then(user => {
			next()
		}).catch(error => {
			next(error)
		})
	}catch (e) {
		next(e)
	}
};