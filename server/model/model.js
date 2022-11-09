const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  stock: {
    type: Number,
  },
  status: {
    type: String,
    default: 'Active',
  },
})

const productList = mongoose.model('productList', productSchema)

module.exports = productList
