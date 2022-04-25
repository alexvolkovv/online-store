const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/:id', orderController.getBasketOrder)
router.get('/all/:id', orderController.getAllOrders)
router.post('/', orderController.addProductToOrder)
router.delete('/', orderController.deleteProductFromOrder)
router.patch('/', orderController.changeProductCountInOrder)




module.exports = router