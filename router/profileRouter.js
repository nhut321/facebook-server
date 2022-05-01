const router = require('express').Router()
const ProfileControllers = require('../app/controllers/ProfileControllers')

router.put('/:id/profile-edit', ProfileControllers.profileEdit)

module.exports = router