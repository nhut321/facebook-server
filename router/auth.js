const jwt = require('jsonwebtoken')

function auth(req, res, next) {
	const token = req.header('Authorization')

	if(!token) return res.json('Token not found!')

	try {
		const decoded = jwt.verify(token.split(' ')[1], process.env.KEY)
		req.userId = decoded
		// return res.json({
		// 	success: true,
		// 	message: 'Authenticated!'
		// })
		next() 
	} catch(err) {
		return res.json({
			success: false,
			message: 'Token is in correct!'
		})
	}
}

module.exports = auth