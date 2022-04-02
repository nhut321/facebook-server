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
		const { postId } = req.params.id 
		Post.update({
			$push: {like: userId}
		}).then(result => {
			return res.json(result)
		})
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