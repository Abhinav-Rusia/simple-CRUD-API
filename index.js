import express from 'express'
import mongoose from 'mongoose'
import Product from './models/product.model.js'

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("hello from Node API server")
})

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const prooduct = await Product.findById(id)
        res.status(200).json(prooduct)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//* update product
app.patch("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const updatedProduct = await Product.findById(id)
        res.status(201).json(updatedProduct)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//* delete product
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.post("/api/products", async (req, res) => {
    try {
        const product = await
            Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

mongoose.connect("mongodb://localhost:27017/Product")
    .then(() => {
        console.log("connected to db");
        app.listen(5000, () => console.log("server started at port http://localhost:5000"))
    })
    .catch((err) => console.log(err))