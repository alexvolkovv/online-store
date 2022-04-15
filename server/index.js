const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3001

const app = express()

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`)
  })
}

start()

