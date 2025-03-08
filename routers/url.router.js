const express = require('express')
const shortid = require('shortid')
const UrlSubmissionModel = require('../model/url.model')

const router = express.Router()

router.post('/urlSubmit', async (req, res) => {
  const { userId, longUrl } = req.body

  try {
    const randomSlug = shortid.generate()

    const shortUrl = `http:localhost:3000/${randomSlug}`

    const urlSubmit = new UrlSubmissionModel({ userId, longUrl, shortUrl })

    await urlSubmit.save()

    res.json({ status: true, message: 'Short url created succesfully', shortUrl })
  } catch (error) {
    console.error(error)
    res.json({ status: false, message: 'Something went wrong' })
  }
})

module.exports = router
