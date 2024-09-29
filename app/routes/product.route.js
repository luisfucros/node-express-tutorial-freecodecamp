const express = require('express')
const router = express.Router()
const {
    getProducts,
    getProduct,
    createProduct, 
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller.js')

const authMiddleware = require('../middleware/auth')


router.route('/').get(authMiddleware, getProducts).post(authMiddleware, createProduct)
router.route("/:id").get(authMiddleware, getProduct).put(authMiddleware, updateProduct).delete(authMiddleware, deleteProduct)

module.exports = router
