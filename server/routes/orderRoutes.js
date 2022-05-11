const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/:id', orderController.getBasketOrder)
router.get('/all/:id', orderController.getAllOrders)
router.get('/products/:orderId', orderController.getProductsFromOrder)
router.post('/', orderController.addProductToOrder)
router.delete('/', orderController.deleteProductFromOrder)
router.patch('/', orderController.changeProductCountInOrder)
router.post('/confirm', orderController.confirmOrder)
router.patch('/all', orderController.updateOrderStatus)

module.exports = router