const bcrypt = require('bcryptjs');
const User = require('../models/User')

function ProfileControllers() {
	this.profileEdit = async function(req,res) {
		const { fname, lname, email, newPassword } = req.body
		const userId = req.params.id
		try {
			const user = await User.findOne({_id: userId})
			if(!user) {
				res.json({message: 'User not found'})
			} else {
			const newEmail = await User.findOne({email})
				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(newPassword, salt, function(err, hash) {
				    	// const newEmail = await User.findOne({email}).exec()
				    	if(!newEmail) {
				    		//console.log(await)
				    		user.updateOne({
													fname,
													lname,
													email,
													password: hash
												})
							return res.json({
								success: true,
								user: user.email
							})


							    // "fname": "Nhựt",
							    // "lname": "Đoàn123",
							    // "newPassword": "333",


				    	} else {
				    		return res.json({
				    			success: false,
				    			message: 'Email has been used!!!'
				    		})
				    	}
				    });
				});
			}
		} catch(err) {
			return res.json({
				success: false,
				error: err
			})
		}
	}
}

module.exports = new ProfileControllers