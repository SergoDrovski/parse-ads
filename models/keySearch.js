const {Schema, model} = require('mongoose');

const keySearch = new Schema({
    key: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date
    }
});

exports.model = model("Key_search", keySearch);