const express = require('express')
const {json} = require("express");
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

require('dotenv').config()
const PORT = process.env.PORT || 3001
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()

app.use(json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
  })
)
app.use(fileUpload({}))
app.use('/api', router)
//Обработка ошибок - последний middleware
app.use(errorHandler)

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`)
  })
}

start()

