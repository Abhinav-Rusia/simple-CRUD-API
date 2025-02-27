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