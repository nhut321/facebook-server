const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Conversation = new Schema({
	member: {
		type: Array,
		default: []
	}
}, { timestamps: true })

module.exports = mongoose.model('conversation', Conversation)