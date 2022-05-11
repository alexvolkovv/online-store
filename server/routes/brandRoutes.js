const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.get('/', brandController.getAll)
router.post('/', brandController.create)
router.patch('/', brandController.change)
router.delete('/:id', brandController.delete)




module.exports = router