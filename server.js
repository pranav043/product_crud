//Importing dependencies needed for project
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const chalk = require('chalk')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

//Importing JS files
const routes = require('./server/routes/router')
const connectDB = require('./server/database/connection')
connectDB()

//Express & EJS Setup
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Flash Notif Setup
app.use(cookieParser('Secret'))
app.use(
  session({
    secret: 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
)
app.use(flash())

//Using router.js file
app.use(routes)

app.listen(port, function () {
  console.log(chalk.bgYellowBright(`Admin app listening on port ${port}`))
})

//for deploying on vercel
//module.exports = app
