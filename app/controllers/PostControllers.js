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
		const {userId} = req.body
		try {
			const user = await User.find({
				_id: userId
			})
			const posts = []
			const friends = user[0].following
			friends.forEach(async item => {
				const post = await Post.find({
					userId: item
				}).populate('userId')
				posts.push(post)
			})
			res.json({
				success: true,
				data: posts,
				user: user[0].following
			})

		} catch(err) {
			return res.json(err)
		}
	}
	this.getOnePost = async function(req,res) {
		const postId = req.params.id
		try {
			const post = await Post.findOne({_id: postId}).populate('userId')
			return res.json({
				success: true,
				data: post
			})
		} catch(err) {
			return res.json(err)
		}
	}
	this.getPostUser = async function(req,res) {
		const userId = req.params.id
		try {
			const post = await Post.find({userId: userId}).populate('userId')
			return res.json({
				success: true,
				data: post
			})
		} catch(err) {
			return res.json(err)
		}
	}
	this.likePost = async function(req,res) {
		const { userId } = req.body
		const { postId } = req.params.id 
		Post.update({
			$push: {like: userId}
		}).then(result => {
			return res.json(result)
		})
	}
}

module.exports = new PostControllers