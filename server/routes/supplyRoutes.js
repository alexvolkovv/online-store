const Router = require('express')
const router = new Router()
const supplyController = require('../controllers/supplyController')

router.get('/:id', supplyController.getOne)
router.get('/', supplyController.getAll)
router.post('/', supplyController.create)
router.delete('/:id', supplyController.delete)
router.put('/', supplyController.change)



module.exports = router