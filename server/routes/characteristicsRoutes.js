const Router = require('express')
const router = new Router()
const characteristicsController = require('../controllers/characteristicsController')

router.get('/', characteristicsController.getAll)
router.post('/', characteristicsController.create)
router.put('/', characteristicsController.change)
router.delete('/:id', characteristicsController.delete)


module.exports = router