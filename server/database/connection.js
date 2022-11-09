const mongoose = require('mongoose')
const chalk = require('chalk')

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL)

    console.log(chalk.cyanBright(`Connected to Database Successfully`))
  } catch (err) {
    console.log(chalk.magenta('Unable to connect to Database: ' + err))
    process.exit(1)
  }
}

module.exports = connectDB
