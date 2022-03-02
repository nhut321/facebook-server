const Comment = require('../models/Comment')

function CommentControllers() {
	this.getComments = async function(req,res) {
		const postId = req.params.id
		try {
			const comment = await Comment.findOne({postId})
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
			res.json(commentItem)
		} catch(err) {
			return res.json(err)
		}
	}
}

module.exports = new CommentControllers