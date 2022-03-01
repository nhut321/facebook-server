const mongoose = require('mongoose')

async function connect() {
	try {
		await mongoose.connect('mongodb+srv://admin:admin@cluster0.tp3tu.mongodb.net/facebook?retryWrites=true&w=majority')
		console.log('Connected to DB!')
	} catch(err) {
		console.log('Server connect err!')
	}
}

module.exports = { connect }