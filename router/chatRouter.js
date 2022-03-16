const router = require('express').Router()
const ChatCtrl = require('../app/controllers/ChatControllers')

router.post('/:id/create', ChatCtrl.postChat)
router.get('/:id', ChatCtrl.getChatReceiver)

module.exports = router
