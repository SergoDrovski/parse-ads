const {Schema, model} = require('mongoose');

const urlScheme = new Schema({
	url: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	status_search_id: {
		type: Schema.Types.ObjectId,
	}
});

// urlScheme.virtual('sliceUrl').set(function (url) {
//     let objUrl = parsUrl.parse(url)
//     this.url = `${objUrl.protocol}//${objUrl.host}`;
// })
// const site = new Url({
//     sliceUrl: 'https://github.com/defunctzombie/node-url#readme'
// })

exports.model = model("New_url", urlScheme);