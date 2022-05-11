const Router = require('express')
const router = new Router()
const stockController = require('../controllers/stockController')

router.get('/', stockController.getAll)
router.post('/', stockController.create)
router.delete('/:id', stockController.delete)
router.put('/', stockController.change)



module.exports = router