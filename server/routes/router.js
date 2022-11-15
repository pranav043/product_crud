const router = require('express').Router()
const controller = require('../controller/controller')

router.get('/', controller.findProduct)
router.get('/addProduct', controller.addProductPage)
router.post('/addProduct', controller.addProduct)
router.get('/updateProduct', controller.updateProductPage)
router.post('/updateProduct', controller.updateProduct)
router.get('/deleteProduct', controller.deleteProduct)

module.exports = router
