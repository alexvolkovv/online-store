const Router = require('express')
const router = new Router()
const pdfController = require('../controllers/pdfController')

router.get('/financial/:year', pdfController.getFinancial)

module.exports = router