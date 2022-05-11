const Router = require('express')
const router = new Router()
const supplierController = require('../controllers/supplierController')

router.get('/', supplierController.getAll)
router.post('/', supplierController.create)
router.delete('/:id', supplierController.delete)
router.put('/', supplierController.change)



module.exports = router