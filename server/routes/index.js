const Router = require('express')
const router = new Router()

const productRoutes = require('./productRoutes')
const clientRoutes = require('./clientRoutes')
const brandRoutes = require('./brandRoutes')
const categoryRoutes = require('./categoryRoutes')
const orderRoutes = require('./orderRoutes')


router.use('/client', clientRoutes)
router.use('/category', categoryRoutes)
router.use('/brand', brandRoutes)
router.use('/product', productRoutes)
router.use('/order', orderRoutes)


module.exports = router