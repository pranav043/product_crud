const router = require('express').router()
const controller = require('../controllers/controller')

router.get('/', (req, res) => {
  res.send('<h1>Working</h1>')
})

router.post('/api/products', controller.newProduct)
router.get('/api/products', controller.allProduct)
router.put('/api/products/:id', controller.updateProduct)
router.delete('/api/products/:id', controller.deleteProduct)
router.get('/api/products/:productName', controller.findProduct)

module.exports = router
