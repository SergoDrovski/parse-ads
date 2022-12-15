const {Schema, model} = require('mongoose');

const urlScheme = new Schema({
    url: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    task_id: {
        type: Schema.Types.ObjectId,
    },
    ads_name: {
        type: Schema.Types.Mixed
    },
    ads_exist: {
        type: Boolean,
        required: true
    },
    is_valid_link: {
        type: Boolean,
        required: true
    },
    page_status: {
        type: Number
    },
    completed: {
        type: Date,
        default: Date.now
    }
});

exports.model = model("Complete_url", urlScheme);