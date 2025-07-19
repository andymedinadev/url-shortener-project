const UrlSubmissionModel = require('../model/url.model')
const shortid = require('../utils/customShortId')

exports.submitUrl = async (req, res) => {
  const { userId, longUrl } = req.body

  if (!userId || !longUrl) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'userId and longUrl are required',
        data: null,
        errors: null,
      })
  }

  try {
    let randomSlug
    let existingUrl

    do {
      randomSlug = shortid.generate()
      existingUrl = await UrlSubmissionModel.findOne({ slug: randomSlug })
    } while (existingUrl)

    const shortUrl = `http://localhost:3000/${randomSlug}`

    const urlSubmit = new UrlSubmissionModel({
      userId,
      longUrl,
      shortUrl,
      slug: randomSlug,
    })

    await urlSubmit.save()

    res.json({
      success: true,
      message: 'Short URL created successfully',
      data: { shortUrl },
      errors: null,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: null,
      errors: null,
    })
  }
}

exports.getUrl = async (req, res) => {
  const { slug } = req.params

  try {
    const urlData = await UrlSubmissionModel.findOne({ slug })

    if (urlData) {
      res.redirect(urlData.longUrl)
    } else {
      res.status(404).json({
        success: false,
        message: 'Invalid short URL',
        data: null,
        errors: null,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error retrieving data from the database',
      data: null,
      errors: null,
    })
  }
}
