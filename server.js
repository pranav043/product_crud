const express = require('express')
const path = require('path')
const ejs = require('ejs')
const chalk = require('chalk')
require('dotenv').config()
const routes = require('./server/routes/router')

const connectDB = require('./server/database/connection')
connectDB()

const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(routes)

app.listen(port, function () {
  console.log(chalk.bgYellowBright(`Admin app listening on port ${port}`))
})

//for deploying on vercel
//module.exports = app
