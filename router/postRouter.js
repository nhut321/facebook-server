const router = require('express').Router()
const postCtrl = require('../app/controllers/PostControllers')

router.post('/create/', postCtrl.createPost)
router.get('/:id/', postCtrl.getOnePost) 
router.put('/:id/like', postCtrl.likePost)
router.put('/:id/unlike', postCtrl.unlikePost)
router.get('/user/:id', postCtrl.getPostUser)
router.get('/friend-posts/:id', postCtrl.getFriendPost)
router.get('/', postCtrl.getPost)
 
module.exports = router