const Product  = require('../models/product.model')
const getAllProducts = async (req,res) =>{
   try {
    const products = await Product.find({});
    res.status(200).json({
      status: 'success',
      msg: 'all products fetched successfully',
      data: { products, nbHits: products.length },
    });
   } catch (error) {
    res.status(500).json({ msg:error})
   }
}
// product by quary search
const getProductsByQueary = async (req,res) =>{
  try {
    const products = await Product.find(req.query);
    if(!products){
    return res.status(404).json({
      msg:'No such product found sorry..'
    })
    }else{
       res.status(200).json({
         status: 'success',
         msg: 'Featched products by quary',
         data: { products,nbHits: products.length },
       });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}
 
const createProduct = async (req,res) =>{
  try {

    // checkProduct already Exits
    const isProductExits = await Product.findOne({name: req.body.name});
    if(!isProductExits){
     const product = await Product.create(req.body);
     console.log('product -->', product);
     res.status(201).json({
       status: 'success',
       msg: 'New product added successfully',
       data: { product },
     });
    }else{
      
       return res.status(200).json({
         msg: 'Product already exits Try to add another..',
         data: { isProductExits },
       });
    }
    
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

const getProduct = async (req,res) => {
  try {
   const { id:productId } = req.params;
   console.log('productId', productId);
   const product = await Product.findById({ _id : productId });
   if (product) {
     res.status(200).json({
       msg: 'Product Featched....',
       data: { product },
     });
   }else{
    res.status(404).json({
      msg: `No such product found with this id : ${productId}`,
    });
   }
  } catch (error) {
     res.status(500).json({ msg: error });
  }
}

const deleteProduct = async (req,res) => {
  const {id:productId} = req.params;
  console.log("product id", productId);
  const product = await Product.findByIdAndDelete({_id:productId});
   if(product){
    res.status(200).json({
      msg:"Product deleted successfully"
    })
   }else{
    return res.status(404).json({
      msg: `No such product found with this id ${productId}`,
    });
   }
}

const updateProduct = async (req,res) => {
  try {
    const {id:productId} = req.params;
    const product = await Product.findOneAndUpdate({_id: productId},req.body);
    if(product){
      res.status(200).json({
        msg:"Product updated successfully",
        data:product
      })
    }else{
      return res.status(404).json({
        msg: `Product not found with this id ${productId}`,
      });
    }
  } catch (error) {
   res.status(500).json({
    msg:error
   }) 
  }
}
module.exports = {
  getAllProducts,
  getProductsByQueary,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};