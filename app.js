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

let userOnline = [] 

const addUser = (username, socketId) => {
	!userOnline.some(user => user.username === username) &&
	userOnline.push({username, socketId})
}

const removeUser = (socketId) => {
	userOnline = userOnline.filter(user => user.socketId !== socketId)
}

const getUser = (username) => {
	return userOnline.find(user => user.username === username)
}

io.on('connection', (socket) => {
	console.log(socket.id + ' vua ket noi')
	socket.on('online', (username) => {
		addUser(username, socket.id)
		io.sockets.emit('server-req-online', username) 
	})
	socket.on('follow-user', (username) => {
		getUser(username)
		if(getUser(username)) {
			io.to(getUser(username).socketId).emit('follow-res','cos nguoi vua moi follow kia')
		} else {
			return
		}
	})
	socket.on('disconnect', user => {
		removeUser(user)
		io.sockets.emit('user-disconect', socket.id) 
	})
})  
  
connect()

router(app)

server.listen(port, () => console.log('Server connected at port: ' + port))