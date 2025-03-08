const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connection = mongoose.createConnection(process.env.MONGO_URI)

connection.on('connected', () => {
  console.log('DB Connected')
})

module.exports = connection
