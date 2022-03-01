const authRouter = require('./authRouter')
const auth = require('./auth')

function router(app) {
	app.use('/user/', authRouter)
	app.get('/',auth , (req,res) => {
		res.json({
			success: true,
			message: 'Authenticated!',
			user: req.userId
		})
	})
}

module.exports = router