const router = require('express').Router()
const postCtrl = require('../app/controllers/PostControllers')

router.post('/create', postCtrl.createPost)
router.get('/', postCtrl.getPost)

module.exports = router