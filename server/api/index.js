const router = require('express').Router()
router.use('/customers', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
