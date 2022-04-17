const Router = require('express')
const router = new Router()

const productRoutes = require('./productRoutes')
const clientRoutes = require('./clientRoutes')
const brandRoutes = require('./brandRoutes')
const categoryRoutes = require('./categoryRoutes')

router.use('/client', clientRoutes)
router.use('/category', categoryRoutes)
router.use('/brand', brandRoutes)
router.use('/product', productRoutes)

module.exports = router