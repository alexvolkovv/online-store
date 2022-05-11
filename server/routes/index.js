const Router = require('express')
const router = new Router()

const productRoutes = require('./productRoutes')
const clientRoutes = require('./clientRoutes')
const brandRoutes = require('./brandRoutes')
const categoryRoutes = require('./categoryRoutes')
const orderRoutes = require('./orderRoutes')
const adminRoutes = require('./adminRoutes')
const statusRoutes = require('./statusRoutes')
const characteristicsRoutes = require('./characteristicsRoutes')
const stockRoutes = require('./stockRoutes')
const supplierRoutes = require('./supplierRoutes')
const supplyRoutes = require('./supplyRoutes')





router.use('/client', clientRoutes)
router.use('/category', categoryRoutes)
router.use('/brand', brandRoutes)
router.use('/product', productRoutes)
router.use('/order', orderRoutes)
router.use('/admin', adminRoutes)
router.use('/characteristics', characteristicsRoutes)
router.use('/status', statusRoutes)
router.use('/stock', stockRoutes)
router.use('/supplier', supplierRoutes)
router.use('/supply', supplyRoutes)









module.exports = router