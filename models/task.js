const {Schema, model} = require('mongoose');

// Статусы поля status
//  "check"
//  "failed"
//  "completed"

const taskScheme = new Schema({
    completed: {
        type: Date
    },
    status: {
        type: String,
        required: true
    },
    urls: {
        type: Number
    },
    ads_exist: {
        type: Number
    },
    ads_not_exist: {
        type: Number
    },
    error: {
        type: String,
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    },
});

exports.model = model("Task", taskScheme);