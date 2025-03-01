import express from 'express'
import mongoose from 'mongoose'
import Productrouter from './router/product.route.js'

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api", Productrouter)

mongoose.connect("mongodb://localhost:27017/Product")
    .then(() => {
        console.log("connected to db");
        app.listen(5000, () => console.log("server started at port http://localhost:5000"))
    })
    .catch((err) => console.log(err))