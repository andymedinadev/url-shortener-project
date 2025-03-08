const express = require('express')
const shortid = require('../utils/customShortId')
const UrlSubmissionModel = require('../model/url.model')

const router = express.Router()

router.post('/urlSubmit', async (req, res) => {
  const { userId, longUrl } = req.body

  if (!userId || !longUrl) {
    return res.status(400).json({ status: false, message: 'userId and longUrl are required' })
  }

  try {
    let randomSlug
    let existingUrl

    do {
      randomSlug = shortid.generate()
      existingUrl = await UrlSubmissionModel.findOne({ slug: randomSlug })
    } while (existingUrl)

    const shortUrl = `http://localhost:3000/${randomSlug}`

    const urlSubmit = new UrlSubmissionModel({ userId, longUrl, shortUrl, slug: randomSlug })

    await urlSubmit.save()

    res.json({ status: true, message: 'Short URL created successfully', shortUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, message: 'Something went wrong' })
  }
})

router.get('/:slug', async (req, res) => {
  const { slug } = req.params

  try {
    const urlData = await UrlSubmissionModel.findOne({ slug })

    if (urlData) {
      res.redirect(urlData.longUrl)
    } else {
      res.status(404).json({ status: false, message: 'Invalid short URL' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, message: 'Error retrieving data from the database' })
  }
})

module.exports = router
