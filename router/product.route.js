import express from 'express'
import Product from '../models/product.model.js'
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send("<h1>Product HomePage </h1> <br> <p>version 1.0.0</p> <br> Go to <a href='/api/products'>/api/products</a> to get all products")
})

//* Get all products
router.get("/products", getProducts)

//* Get single product
router.get("/products/:id", getProduct)

//* Create product
router.post("/products", postProduct)

//* Update product
router.patch("/products/:id", updateProduct)

//* Delete product
router.delete("/products/:id", deleteProduct)

export default router
