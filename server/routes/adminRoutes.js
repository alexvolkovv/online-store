const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const orderController = require('../controllers/orderController')


router.get('/orders', orderController.getOrdersForAdmin)


module.exports = router