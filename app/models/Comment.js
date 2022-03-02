const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const Comment = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	postId: {
		type: Schema.Types.ObjectId,
		ref: 'post'
	},
	comment: String
})

module.exports = mongoose.model('comment', Comment)