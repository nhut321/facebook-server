const router = require('express').Router()
const AuthCtrl = require('../app/controllers/AuthControllers.js')

router.post('/login',AuthCtrl.login)
router.post('/register',AuthCtrl.register)
router.put('/:id/follow',AuthCtrl.follow)
router.put('/:id/unfollow',AuthCtrl.unfollow)
router.get('/:id', AuthCtrl.getUser) 

module.exports = router