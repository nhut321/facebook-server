const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const Post = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	description: String,
	like: {
		type: Array,
		default: []
	}
})

module.exports = mongoose.model('post', Post)