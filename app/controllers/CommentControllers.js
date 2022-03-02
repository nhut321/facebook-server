const Comment = require('../models/Comment')

function CommentControllers() {
	this.getComments = async function(req,res) {
		const postId = req.params.id
		const comment = await Comment.find({postId})
		try {
			res.json(comment)
		} catch(err) {
			return res.json(err)
		}
	}
	this.createComment = async function(req,res) {
		const { postId, userId, comment } = req.body
		const commentItem = new Comment({ postId, userId, comment })
		try {
			commentItem.save()
			res.json({
				success: true,
				commentItem 
			})
		} catch(err) {
			return res.json(err)
		}
	}
}

module.exports = new CommentControllers