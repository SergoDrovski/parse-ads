const {Schema, model} = require('mongoose');

// Статусы поля status
//  "search"
//  "failed"
//  "completed"

const statusSearchScheme = new Schema({
	status: {
		type: String,
		required: true
	},
	urls: {
		type: Number
	},
	error: {
		type: String,
		default: null
	},
	completed: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
});

exports.model = model("Status_Search_New_Url", statusSearchScheme);