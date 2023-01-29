const {schema: RespSchema} = require("../libs/resp/ResponseSchema");
const User = require('../models/user.js').model;

exports.loginUser = async function(request, response, next){
	if(!request.body.auth) return next(new Error('no data!'))
	// Валидация
	try{
		const validData = new ValidDataForm(request.body.auth);
		if(!validData.getStatus()) {
			response.json(new RespSchema(404, null, validData.getError()));
			return
		}
		await User.authorize(request.body.auth.username, request.body.auth.password).then(user => {
			request.session.user = user._id;
			response.json(new RespSchema(200,{user_id: user._id},null));
		}).catch(error => {
			response.json(new RespSchema(404,null,error.message));
		})
	}catch (e) {
		next(e)
	}
};

exports.logoutUser = async function(request, response, next){
	request.session.destroy();
	response.status(404);
	response.redirect('/')
}

class ValidDataForm {
	constructor(data = {}) {
		this.data = data;
		this.error = [];
		this.status = this.formatting();
	}

	formatting() {
		if (typeof this.data !== 'object') {
			this.error.push('неподходящий формат данных!');
			return false
		}
		
		if (!Object.keys(this.data).length) {
			this.error.push(`Нет данных!`);
			return false
		}
		for(let key in this.data) {
			let value = String(this.data[key]);
			if (value.trim() === '') {
				this.error.push(`Поле ${key} пустое`);
				return false
			}
			if (value.length > 25) {
				this.error.push(`Слишком длинное поле ${key}`);
				return false
			}
			if (value.indexOf(' ') !== -1){
				this.error.push(`Никаких пробелов в поле ${key}`);
				return false
			}
			
		}
		return this.error.length === 0
	}

	getError() {
		return this.error;
	}
	getStatus() {
		return this.status;
	}
}