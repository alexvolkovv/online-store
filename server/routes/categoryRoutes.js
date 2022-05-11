const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAll)
router.post('/', categoryController.create)
router.put('/', categoryController.change)
router.delete('/:id', categoryController.delete)




module.exports = router