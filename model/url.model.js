const { Schema } = require('mongoose')
const db = require('../config/db')
const UserModel = require('./user.model')

const urlSubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName
  },
  longUrl: { type: String },
  shortUrl: { type: String }
})

const UrlSubmissionModel = db.model('urlSubmission', urlSubmissionSchema)

module.exports = UrlSubmissionModel
