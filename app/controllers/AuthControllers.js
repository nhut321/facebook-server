const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function AuthControllers() {
	this.login = async function(req,res) {
		let { email, password } = req.body
		const user = await User.findOne({email})
		if (!user) {
			return res.json('Email not exists!')
		}
		console.log(user.fname)
		try {
			bcrypt.compare(password,user.password, function(err, result) {
			    if (result) {
			    	const token = jwt.sign({
			    		email: user.email, 
			    		userId: user._id, 
			    		verified: user.verified,
			    		fullName: user.fullName,
			    		avatar: user.avatar,
			    		fname: user.fname,
			    		lname: user.lname,
			    	}, process.env.KEY)
			    	return res.json({
			    		success: true,
			    		user,
			    		token
			    	})
			    } else {
			    	return res.json({
			    		success: false,
			    		message: 'Email or password is wrong!',
			    	})
			    }
			});
		} catch(err) {
			res.json(err)
		}
	}
	this.register = async function(req,res) {
		let { email, password, fullName } = req.body
		const user = await User.findOne({email})

		if(user) {
			res.json('Email already exists!')
		} 
		if(!user) {
			try {
				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(password, salt, function(err, hash) {
				        password = hash
						const user1 = new User({email,password,fullName})
						user1.save()
						res.json(user1)
				    });
				});
			} catch(err) {
				res.json(err)
			}
		}
	}
	this.getUser = async function(req,res) {
		try {
			const user = await User.findOne({_id: req.params.id})
			const friends = await Promise.all(
				user.following.map(v => {
					return User.findById(v)
				})
			)
			let friendList = []
			friends.map(friend => {
				const { _id, fname, lname, avatar } = friend
				friendList.push({ _id, fname, lname, avatar })
			})
			
			return res.json({
				success: true,
				friends: friendList,
				user
			})
		} catch(err) {
			return res.json({
				success: false,
				error: err
			})
		}
	}
	this.follow = async function(req,res) {
		const userId = req.params.id
		const { currentId } = req.body
		console.log(req.params.id)
		try {
			const user = await User.findById({_id: userId})
			const currentUser = await User.findById({_id: currentId})
			if(!user.follower.includes(currentId)) {
				await user.updateOne({
					$push: {follower: currentId}
				})
				await currentUser.updateOne({
					$push: {following: userId}
				})
				return res.json({
					success: true,
					user
				})
			} else {
				return res.json({
					success: false,
					message: 'You already followed this user!!!'
				})
			}
		} catch(err) {
			return res.json(err)
		}
	}
	this.unfollow = async function(req,res) {
		try {
			const user = await User.findById({_id: req.params.id})
			const currentUser = await User.findById({_id: req.body.currentId})
			if(user.follower.includes(req.body.currentId)) {
				await user.updateOne({
					$pull: {follower: req.body.currentId}
				}).then()
				await currentUser.updateOne({
					$pull: {following: req.params.id}
				})
				return res.json({
					success: true,
					message: 'You has been unfollow user!!!',
					user
				})
			} else {
				return res.json({
					success: false,
					message: "You can't unfollow when you not follow user!!"
				})
			}
		} catch(err) {
			return res.json(err)
		}
	}
} 

module.exports = new AuthControllers