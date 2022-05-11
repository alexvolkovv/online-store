const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')

router.post('/registration', clientController.registration)
router.post('/login', clientController.login)
router.get('/:id', clientController.getAll)
router.put('/:id', clientController.changeRole)



module.exports = router