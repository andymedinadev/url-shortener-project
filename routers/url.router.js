const express = require('express')
const urlController = require('../controllers/urlController')

const router = express.Router()

router.post('/submitUrl', urlController.submitUrl)

router.get('/:slug', urlController.getUrl)

module.exports = router
