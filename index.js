import express from 'express';
import dbConnect from './db.connect.js';
import Product from './product.model.js';
import mongoose from 'mongoose';
dbConnect();
const app= express();
//? To make app understand about json 
app.use(express.json());
//? Adding the product from the postman.
app.post("/product/add", async (req, res) =>{
  const newProduct = req.body;
       await Product.create(newProduct);

    return res.status(201).send({ message: "Product is added in the database." })
})
// To find the product list
app.get("/product/list", async(req, res) => {
  const productList= await Product.find({},{
    name:1,
    brand: 1,
    price : 1,
    type : 1
  })
  res.status(200).send ({
    message: "The movies list are given below", 
    product: productList
  })

})
//! To find the one product from the list with checking the correct mongo id 
app.get('/product/detail/:id', async (req,res)=>{
 
  const productId= req.params.id
  const validityOfId= mongoose.isValidObjectId(productId);
  if(!validityOfId){
    res.status(404).send("The written id is not valid");
  }
  const requiredProduct= await Product.findOne({_id: productId})
  res.status(200).send({
    message: "The searched id is:",
    ProductDetail: requiredProduct
  })
})

//! to update and edit the product Through body 
app.put('/product/edit/:id', async(req, res) =>
{
  const needUpdateProductId= req.params.id;
  const validityOfId= mongoose.isValidObjectId(needUpdateProductId)
  if(!validityOfId){
    return res.status(404).send(`Invalid Id: ${needUpdateProductId}`);
  }
  const needUpdateProduct= await Product.findOne({_id: needUpdateProductId})
  const newValues= req.body
  //? Edit product
  await Product.updateOne({_id: needUpdateProduct} ,{
    
    $set: {
        ...newValues
    }
  })
  return res.status(200).send({message:"Product is update.", Product: newValues})
})



// !    NETWORK PORT AND SERVER
const PORT= 8010;

app.listen(PORT,()=>{
console.log(`App is listening to ${PORT}`);
})