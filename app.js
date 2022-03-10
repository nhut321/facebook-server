require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
})
const router = require('./router')

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const { connect } = require('./config/data')

// io.on('connection', (socket) => {  
// 	socket.on('connecting', user => console.log('welcome to ' + user))
// })  
  
connect()

router(app)

server.listen(port, () => console.log('Server connected at port: ' + port))