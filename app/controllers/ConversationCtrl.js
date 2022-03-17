const Conversation = require('../models/Conversation')

function ConversationCtrl() {
	this.createConversation = async (req,res) => {
		const { senderId, receiverId } = req.body
		const conversation = await Conversation.find({member: [req.body.senderId, req.body.receiverId]}) 
		if(!conversation){
			try {
				const newConversation = new Conversation({
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
					message: err
				})
			}
		} else {
			res.json({
				success: false,
				message: 'Conversation already exist'
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