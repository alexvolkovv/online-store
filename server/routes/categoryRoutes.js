const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', categoryController.getAll)
router.post('/', checkRoleMiddleware(2), categoryController.create)


module.exports = router