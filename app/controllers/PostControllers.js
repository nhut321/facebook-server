const Post = require('../models/Post')
const User = require('../models/User')

function PostControllers() {
	this.createPost = async function(req,res) {
		const { description, userId } = req.body
		const post = new Post({description, userId})
		try {
			post.save()
			res.json({
				success: true,
				data: post
			})  
		} catch(err) {
			return res.json({
				success: false,
				message: 'Create post error!'
			})
		}
	}
	this.getPost = async function(req,res) {
		try {
			const posts = await Post.find({}).populate('userId')

			// console.log(posts)
			res.json({
				success: true,
				data: posts
			})

		} catch(err) {

		}
	}
}

module.exports = new PostControllers