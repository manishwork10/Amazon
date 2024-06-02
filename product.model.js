import mongoose from 'mongoose'

const productSchema= new mongoose.Schema({
    name: String,
    brand: String,
    Price: Number,
    type: String
})

//! Creating the table in the database
const Product= mongoose.model("product", productSchema);

export default Product;