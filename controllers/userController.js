const mongoose = require("mongoose");
const User = require('../models/user.js').model;

exports.getUsers = function(request, response, next){
    User.find().exec(function (err, persons) {
        if (err) return next(err)
        mongoose.disconnect();
        response.json(persons);
    })
};