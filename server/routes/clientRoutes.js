const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')

router.post('/registration', clientController.registration)
router.post('/login', clientController.login)

module.exports = router