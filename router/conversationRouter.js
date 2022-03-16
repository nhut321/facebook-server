const router = require('express').Router()
const ConversationCtrl = require('../app/controllers/ConversationCtrl')

router.post('/create', ConversationCtrl.createConversation)
router.get('/:id', ConversationCtrl.getConversation)

module.exports = router