require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./router')

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const { connect } = require('./config/data')

connect()

router(app)

app.listen(port, () => console.log('Server connected at port: ' + port))