const {Schema, model} = require('mongoose');

const statScheme = new Schema({
    all_urls: {
        type: Number,
        required: true
    },
    urls_complete: {
        type: Number,
        required: true
    },
    all_include: {
        type: Number,
        required: true
    },
    all_exclude: {
        type: Number,
        required: true
    }
});

exports.model = model("Stat", statScheme);