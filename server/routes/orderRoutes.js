const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/:id', orderController.getBasketOrder)
// router.post('/:id', clientController.login)
router.get('/all/:id', orderController.getAllOrders)

module.exports = router