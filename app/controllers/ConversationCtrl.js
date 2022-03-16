const Conversation = require('../models/Conversation')

function ConversationCtrl() {
	this.createConversation = async (req,res) => {
		try {
			const conversation = new Conversation({
				member: [
					req.body.senderId,
					req.body.receiverId
				]
			})
			await conversation.save()
			res.json(conversation)
		} catch(err) {
			res.json({
				success: false,
				error: err
			})
		}
	}
	this.getConversation = async (req,res) => {
		const userId = req.params.id
		try {
			const conversation = await Conversation.find({
				member: {$in: [userId]}
			})
			res.json({
				success: true,
				conversation
			})
		} catch(err) {
			res.json({
				success: false,
				error: err
			})
		}
	}
}

module.exports = new ConversationCtrl