const chalk = require('chalk')
var productList = require('../model/model')

exports.findProduct = async (req, res) => {
  const products = await productList.find()

  if (products == '') {
    products.push('Empty')
  }

  productList
    .find()
    .then((data) => {
      res.render('index', {
        products: products,
      })
    })
    .catch((err) => {
      res.render('error', {
        message: 'Unable to access database: ' + err,
      })
    })
}

exports.addProductPage = (req, res) => {
  res.render('addProduct')
}

exports.addProduct = (req, res) => {
  if (!req.body) {
    res.render('error', {
      message:
        'Data is Missing. Please make sure to enter some data. OR some issue while adding Product',
    })
  }
  const product = new productList({
    productName: req.body.productName,
    productBrand: req.body.productBrand,
    productModel: req.body.productModel,
    productDescription: req.body.productDescription,
    price: req.body.price,
    showPrice: req.body.showPrice,
    stock: req.body.stock,
    tags: req.body.tags,
    display: req.body.display,
  })

  product
    .save(product)
    .then((data) => {
      console.log(
        chalk.blue('Successfully added product: ' + product.productName)
      )
      res.redirect('/addProduct')
    })
    .catch((err) => {
      res.render('error', {
        message: 'Unable to add product: ' + err,
      })
    })
}

exports.updateProductPage = (req, res) => {
  const id = req.query.id
  productList
    .findById(id)
    .then((data) => {
      if (!data) {
        res.render('error', {
          message: 'Unable to find product: ' + err,
        })
      } else {
        res.render('updateProduct', {
          products: data,
        })
      }
    })
    .catch((err) => {
      res.render('error', {
        message:
          'Unable to fetch via database while trying to update details: ' + err,
      })
    })
}

exports.updateProduct = (req, res) => {
  if (!req.body) {
    res.render('error', {
      message:
        'Data is Missing. Please make sure to enter some data. OR some issue while adding Product',
    })
  }

  const id = req.query.id
  productList
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.render('error', {
          message:
            'Data is Missing. Please make sure to enter some data. OR some issue while updating Product',
        })
      } else {
        console.log(
          chalk.blue('Successfully updated product: ' + req.body.productName)
        )
        res.redirect('/updateProduct?id=' + id)
      }
    })
    .catch((err) => {
      res.render('error', {
        message: 'Some error occurred while trying to update details: ' + err,
      })
    })
}

exports.deleteProduct = (req, res) => {
  const id = req.query.id

  productList
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.render('error', {
          message: 'Unable to find product: ' + err,
        })
      } else {
        console.log(chalk.blue('Successfully deleted product with id: ' + id))
        res.redirect('/')
      }
    })
    .catch((err) => {
      res.render('error', {
        message: 'Some error occurred while trying to delete product: ' + err,
      })
    })
}
