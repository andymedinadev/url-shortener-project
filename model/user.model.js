const { Schema } = require('mongoose')
const db = require('../config/db')

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String }
})

const UserModel = db.model('users', userSchema)

module.exports = UserModel
