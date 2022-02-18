const asyncHandler = require('express-async-handler')

const Product = require ('../models/productModel')
const User = require('../models/userModel')


// @desc Get Products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id })

  res.status(200).json( products)
})

// @desc Create Products
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  if(!req.body.text && !req.body.description && !req.body.price & !req.body.stock) {
    res.status(400)
    throw new Error('Please add a name, description, price and stock')
  }

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    user: req.user.id
  })

  res.status(200).json(product)
})

// @desc Update Products
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(!product) {
    res.status(400)
    throw new Error('Product Not Found')
  }
  const user = await User.findById(req.user.id)
  //Check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  console.log(product.user, user.id)
  console.log(product.user.toString(), user.id)
  //Make sure  the logged in user matches the product user
  if(product.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedProduct)
})

// @desc Delete Products
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(!product) {
    res.status(400)
    throw new Error('Product Not Found')
  }

  const user = await User.findById(req.user.id)
  //Check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure  the logged in user matches the product user
  if(product.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  await product.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}