const Message = require('../models/Message')

function ChatControllers() {
	this.getChatReceiver = async function(req,res) {
		const conversationId = req.params.id
		try {
			const message = await Message.find({conversationId})
			res.json({
				success: true,
				message
			})
		} catch(err) {
			res.json({
				success: false,
				error: err
			})
		}
	}
	this.postChat = function(req,res) {
		const conversationId = req.params.id
		const { senderId, message } = req.body
		const newMessage = new Message({conversationId, senderId, message})
		newMessage.save()
		return res.json({
			type: 'success',
			message: newMessage
		})
	}
}

module.exports = new ChatControllers