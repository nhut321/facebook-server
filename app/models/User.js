const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const User = new Schema({
	fullName: {
		type: String,
		trim: true
	},
	fname: {
		type: String,
		trim: true
	},
	lname: {
		type: String,
		trim: true
	},
	avatar: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		min: 6,
		max: 20
	},
	follower: {
		type: Array,
		default: []
	},
	following: {
		type: Array,
		default: []
	},
	friends: {
		type: Array,
		default: []
	},
	verified: {
		type: Boolean,
		default: false
	},
	friendRequests: {
		type: Array,
		default: []
	},
	notification: {
		type: Array,
		default: []
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('user', User)