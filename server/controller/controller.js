const chalk = require('chalk')
var productList = require('../model/model')

//get('/') code. Lists down all the data from database
exports.findProduct = async (req, res) => {
  const products = await productList.find()

  //checking if database is empty
  if (products == '') {
    products.push('Empty')
  }

  productList
    .find()
    .then((data) => {
      //render EJS with all the data
      //notif is for delete function
      res.render('index', {
        products: products,
        notif: req.flash('notifDel'),
      })
    })
    .catch((err) => {
      //error handling
      res.render('error', {
        message: 'Unable to access database: ' + err,
      })
    })
}

//get('/addProduct') code. Opens form for user to enter details
//notif passed from function
exports.addProductPage = (req, res) => {
  res.render('addProduct', {
    notif: req.flash('notifAdd'),
  })
}

//post('/addProduct') code. Enters the user data into database.
exports.addProduct = (req, res) => {
  //Error handling if no data is passed
  if (!req.body) {
    res.render('error', {
      message:
        'Data is Missing. Please make sure to enter some data. OR some issue while adding Product',
    })
  }
  //Storing all user entered data
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
      //Flash message to confirm addition
      req.flash(
        'notifAdd',
        'Successfully Added Product ' +
          product.productBrand +
          ' ' +
          product.productName +
          ' ' +
          product.productModel
      )
      //Redirecting to get code with notif message
      res.redirect('/addProduct')
    })
    .catch((err) => {
      //Error handling
      res.render('error', {
        message: 'Unable to add product: ' + err,
      })
    })
}

//get('/updateProduct) code. Opens form with pre-filled data with values from database.
exports.updateProductPage = (req, res) => {
  const id = req.query.id
  productList
    .findById(id)
    .then((data) => {
      if (!data) {
        //If unable to find product
        res.render('error', {
          message: 'Unable to find product: ' + err,
        })
      } else {
        //Render UpdateProduct with values from DB
        //Notif received from post function
        res.render('updateProduct', {
          products: data,
          notif: req.flash('notifUpdate'),
        })
      }
    })
    .catch((err) => {
      //Error handling
      res.render('error', {
        message:
          'Unable to fetch via database while trying to update details: ' + err,
      })
    })
}

//post('/updateProduct') code. Any changes committed by user are updated in DB
exports.updateProduct = (req, res) => {
  if (!req.body) {
    //Error handling for no data
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
        //Flashing for get request for confirmation
        req.flash(
          'notifUpdate',
          'Successfully Updated Product ' +
            req.body.productBrand +
            ' ' +
            req.body.productName +
            ' ' +
            req.body.productModel
        )
        res.redirect('/updateProduct?id=' + id)
      }
    })
    .catch((err) => {
      //Error handling
      res.render('error', {
        message: 'Some error occurred while trying to update details: ' + err,
      })
    })
}

//get('/deleteProduct') code. Gets id for product to be deleted
exports.deleteProduct = (req, res) => {
  const id = req.query.id

  productList
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        //Error handling if product not found
        res.render('error', {
          message: 'Unable to find product: ' + err,
        })
      } else {
        console.log(chalk.blue('Successfully deleted product with id: ' + id))
        //Flashing confirmation to get('/')
        req.flash(
          'notifDel',
          'Successfully Deleted Product ' +
            data.productBrand +
            ' ' +
            data.productName +
            ' ' +
            data.productModel
        )
        res.redirect('/')
      }
    })
    .catch((err) => {
      //Error Handling
      res.render('error', {
        message: 'Some error occurred while trying to delete product: ' + err,
      })
    })
}
