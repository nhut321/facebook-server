const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function AuthControllers() {
	this.login = async function(req,res) {
		let { email, password } = req.body
		const user = await User.findOne({email})
		console.log(user)
		if (!user) {
			return res.json('Email or password is wrong!')
		}
		try {
			bcrypt.compare("baconsoi", user.password, function(err, result) {
			    if (password == result) {
			    	const token = jwt.sign({email: user.email, userId: user._id, verified: user.verified}, process.env.KEY)
			    	return res.json({
			    		success: true,
			    		user,
			    		token
			    	})
			    } else {
			    	return res.json({
			    		success: false,
			    		message: 'Email or password is wrong!'
			    	})
			    }
			});
		} catch(err) {
			res.json(err)
		}
	}
	this.register = async function(req,res) {
		let { email, password } = req.body
		const user = await User.findOne({email})

		if(user) {
			res.json('Email already exists!')
		} 
		if(!user) {
			try {
				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash("baconsoi", salt, function(err, hash) {
				        password = hash
						const user1 = new User({email,password})
						user1.save()
						res.json(user1)
				    });
				});
			} catch(err) {
				res.json(err)
			}
		}

	}
}

module.exports = new AuthControllers