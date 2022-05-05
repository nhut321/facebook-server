const Post = require('../models/Post')
const User = require('../models/User')

function PostControllers() {
	this.createPost = async function(req,res) {
		const { description, userId, imageUrl } = req.body
		const post = new Post({description, userId, imageUrl})
		try {
			post.save() 
			res.json({
				success: true,
				data: post
			})  
		} catch(err) {
			return res.json({
				success: false,
				data: [],
				message: 'Create post error!'
			})
		}
	}
	this.getPost = async function(req,res) {
		try {
			const posts = await Post.find({}).populate('userId')
			return res.json({
				success: true,
				data: posts
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
		const postId = req.params.id 
		const post = await Post.findOne({_id: postId})
		if (!post.like.includes(userId)) {
			await post.update({
				$push: {
					like: userId
				}
			})
			return res.json({
				success: true,
				message: 'Liked!',
				data: post
			})
		} else {
			return res.json({
				success: false,
				message: 'U already liked!'
			})
		}
	}
	this.unlikePost = async function(req,res) {
		const { userId } = req.body
		const postId = req.params.id 
		const post = await Post.findOne({_id: postId})
		if (post.like.includes(userId)) {
			await post.update({
				$pull: {
					like: userId
				}
			})
			return res.json({
				success: true,
				message: 'unlike!!!',
				data: post
			})
		}
	}
	this.getFriendPost = async function(req,res) {
		const myId = req.params.id
		try {
			const friendPosts = []
			const user = await User.find({_id: myId})
			const friendId = user[0].following
			friendId.push(myId)
			const post = await Post.find({userId: friendId}).populate('userId')
			return res.json({
				success: true,
				data: post
			})

		} catch(err) {
			return res.json({
				success: false,
				error: err
			})
		}
	}
}

module.exports = new PostControllers