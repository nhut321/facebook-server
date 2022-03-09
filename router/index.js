const authRouter = require('./authRouter')
const postRouter = require('./postRouter')
const commentRouter = require('./commentRouter')
const searchRouter = require('./searchRouter')
const auth = require('./auth')

function router(app) {
	app.use('/search/', searchRouter)
	app.use('/user/', authRouter)
	app.use('/comments/', commentRouter)
	app.use('/posts/',auth , postRouter)
	app.get('/',auth , (req,res) => {
		res.json({
			success: true,
			message: 'Authenticated!',
			user: req.userId
			// verified: req.userId.verified  
		})
	})
}

module.exports = router