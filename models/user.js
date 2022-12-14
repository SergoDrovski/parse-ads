const {Schema, model} = require('mongoose');

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

exports.model = model("User", userScheme);