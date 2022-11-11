const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  //Name of Product
  productName: {
    type: String,
    required: true,
  },
  //Brand of Product
  productBrand: {
    type: String,
    required: true,
  },
  //Model no of Product
  productModel: {
    type: String,
    required: true,
  },
  //Description of Product
  productDescription: {
    type: String,
  },
  //Price of Product
  price: {
    type: Number,
  },
  //hide/show price
  showPrice: {
    type: String,
    default: 'OFF',
  },
  //product qty in stock
  stock: {
    type: Number,
  },
  //enter common tags to search
  tags: {
    type: String,
  },
  //show/hide product
  display: {
    type: String,
    default: 'ON',
  },
})

const productList = mongoose.model('productList', productSchema)

module.exports = productList
