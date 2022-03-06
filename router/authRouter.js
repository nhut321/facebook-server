const router = require('express').Router()
const AuthCtrl = require('../app/controllers/AuthControllers.js')

router.post('/login',AuthCtrl.login)
router.post('/register',AuthCtrl.register)
router.get('/:id', AuthCtrl.getUser) 

module.exports = router