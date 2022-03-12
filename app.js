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

const userSocket = []

io.on('connection', (socket) => {
	userSocket.push(socket.id)
	socket.on('online', user => {
		io.sockets.emit('server-req-online', {userId: socket.id, user: user}) 
	})
	socket.on('follow-noti', data => {
		console.log(userSocket)
		io.to(data.targetUser).emit('follow-noti-to-client', data)
	})
	socket.on('disconnect', user => {
		console.log('co nguoi disconnect: ' + socket.id)
		io.sockets.emit('user-disconect', socket.id)
	})
})  
  
connect()

router(app)

server.listen(port, () => console.log('Server connected at port: ' + port))