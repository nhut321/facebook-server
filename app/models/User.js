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
	}
})

module.exports = mongoose.model('user', User)