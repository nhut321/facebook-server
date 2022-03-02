const router = require('express').Router()
const CommentCtrl = require('../app/controllers/CommentControllers.js')

router.get('/:id/', CommentCtrl.getComments)
router.post('/create', CommentCtrl.createComment)

module.exports = router