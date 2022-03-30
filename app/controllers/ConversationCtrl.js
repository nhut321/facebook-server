const Conversation = require('../models/Conversation')

function ConversationCtrl() {
	this.createConversation = async (req,res) => {
		const conversation = await Conversation.find({member: [req.body.senderId, req.body.receiverId]})
		console.log(conversation)
		if(conversation.length <= 0){
			try {
				const newConversation = new Conversation({
					member: [
						req.body.senderId,
						req.body.receiverId
					]
				})
				await newConversation.save()

				res.json({
					success: true,
					newConversation
				})
			} catch(err) { 
				res.json({
					success: false,
					message: err
				})
			}
		} else {
			res.json({
				success: false,
				message: 'Conversation already exist',
				conversation
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