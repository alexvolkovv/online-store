const Router = require('express')
const router = new Router()
const statusController = require('../controllers/statusController')

router.get('/', statusController.getAll)
// router.post('/', brandController.create)


module.exports = router