import express from 'express'
const router = express.Router()
import ProductController from './controllers/products.controller'

// product routes
router.post('/product', ProductController.createProduct)
router.get('/product', ProductController.getAllProducts)
router.get('product/:id', ProductController.getProductById)
router.put('/product/:productId', ProductController.updateProduct)
router.delete('/product/:productId', ProductController.deleteProduct)

export default router
