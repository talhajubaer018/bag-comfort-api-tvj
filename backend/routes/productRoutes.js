const express = require('express')
const router = express.Router()

const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')


router.get('/', getProducts)

router.post('/', createProduct)

router.put('/', updateProduct)

router.put('/', deleteProduct)

module.exports = router
