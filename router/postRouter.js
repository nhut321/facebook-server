const router = require('express').Router()
const postCtrl = require('../app/controllers/PostControllers')

router.post('/create/', postCtrl.createPost)
router.get('/:id/', postCtrl.getOnePost)
router.put('/:id/like', postCtrl.likePost)
router.get('/user/:id', postCtrl.getPostUser)
router.get('/', postCtrl.getPost)

module.exports = router