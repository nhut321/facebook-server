const router = require('express').Router()
const SearchCtrl = require('../app/controllers/SeachControllers')

router.get('/', SearchCtrl.getUser)

module.exports = router