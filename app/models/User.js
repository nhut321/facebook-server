const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const User = new Schema({
	fullName: String,
	avatar: String,
	email: {
		type: String,
		required: true
	},
	password: {
		type: String
	},
	friends: {
		type: Array,
		default: []
	},
	verified: {
		type: Boolean,
		default: false
	},
})

module.exports = mongoose.model('user', User)