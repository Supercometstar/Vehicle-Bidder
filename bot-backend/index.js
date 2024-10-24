const express = require('express')
const cors = require('cors')
const hpp = require('hpp')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth.route')
const botRoutes = require('./routes/bot.route')

const port = 4000

const app = express()

app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/bid', botRoutes)

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})