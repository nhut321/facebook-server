const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
	conversationId: {
		type: String
	},
	senderId: {
		type: String
	},
	message: {
		type: String,
		max: 2000
	}
}, { timestamps: true })

module.exports = mongoose.model('message', Message)