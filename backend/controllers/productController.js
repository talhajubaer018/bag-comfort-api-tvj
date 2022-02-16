const asyncHandler = require('express-async-handler')

// @desc Get Products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get products' })
})

// @desc Create Products
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  res.status(200).json({ message: 'created product' })
})

// @desc Get Products
// @route GET /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `updated product ${req.params.id}` })
})

// @desc Delete Products
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `deleted product ${req.params.id}` })
})

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}