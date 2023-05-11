import express from 'express'
const router = express.Router()
import ProductController from './controllers/products.controller'

router.post('/product', ProductController.createProduct)

export default router
