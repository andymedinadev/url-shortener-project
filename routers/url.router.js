const express = require('express')
const shortid = require('../utils/customShortId')
const UrlSubmissionModel = require('../model/url.model')

const router = express.Router()

router.post('/urlSubmit', async (req, res) => {
  const { userId, longUrl } = req.body

  try {
    let randomSlug
    let existingUrl

    do {
      randomSlug = shortid.generate()
      existingUrl = await UrlSubmissionModel.findOne({ shortUrl: `http://localhost:3000/${randomSlug}` })
    } while (existingUrl)

    const shortUrl = `http://localhost:3000/${randomSlug}`

    const urlSubmit = new UrlSubmissionModel({ userId, longUrl, shortUrl })

    await urlSubmit.save()

    res.json({ status: true, message: 'Short URL created successfully', shortUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, message: 'Something went wrong' })
  }
})

module.exports = router
