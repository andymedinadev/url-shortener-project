const { Schema } = require('mongoose')
const db = require('../config/db')
const UserModel = require('./user.model')

const urlSubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
    required: true
  },
  longUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true }
})

const UrlSubmissionModel = db.model('urlSubmission', urlSubmissionSchema)

module.exports = UrlSubmissionModel
