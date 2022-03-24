const User = require('../models/User')

function SearchControllers() {
	this.getUser = async function(req,res) {
		const name = req.query.name
		try {
			let user = await User.find({fname: {$regex: new RegExp('^'+name+'.*','i')}}).exec()
			user = user.slice(0,5)
			res.json(user)
		} catch(err) {
			res.json(err) 
		}
	}
}

module.exports = new SearchControllers