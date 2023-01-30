const {Schema, model} = require('mongoose');
const crypto = require('node:crypto');

const userScheme = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userScheme.methods.encryptPass = function (pass) {
    return crypto.createHmac('sha1', this.salt).update(pass).digest('hex');
}

userScheme.methods.checkPass = function (pass) {
    return this.encryptPass(pass) === this.hash_password;
}

userScheme.virtual('password').set(function (pass) {
    this.salt = Math.random() + "";
    this.hash_password = this.encryptPass(pass);
})

userScheme.statics.authorize = async function(name, pass) {
	try{
		return await this.find({ username: name }).then(users => {
			if(users.length !== 0) {
				const user = users[0];
				if (crypto.createHmac('sha1', user.salt).update(pass).digest('hex') === user.hash_password) {
					return user;
				} else {
					throw new Error('неверный пароль!')
				}
			} else {
				throw new Error('Пользователь не найден!')
			}
		}).catch(err=>{
			throw err
		})
	} catch (e){
		throw e
	}
}

exports.model = model("User", userScheme);