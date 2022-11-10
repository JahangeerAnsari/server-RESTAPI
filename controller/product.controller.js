const { StatusCodes } = require('http-status-codes');
const Product = require('../models/product.model');
const createProduct =  async (req,res) =>{
  

    try {
     const { name, price, createdBy } = req.body;
     let productPictures = [];

     if (req.files.length > 0) {
       productPictures = req.files.map((file) => {
         return { img: file.filename };
       });
     }
console.log('productPictures2222', productPictures);

    // req.body.createdBy = ;
    if(productPictures.length > 0){
    const product = await Product.create({
      name,
      price,
      createdBy: req.user.userId,
      productPictures,
    });
    if(!product){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"No product creatwd"
        })
    }
    res.status(StatusCodes.CREATED).json({
      msg: ' new job created....',
      data: product,
    });

    }

    
      
 
    

    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });     
    }
   
}

const getAllProduct = async (req,res) =>{
   try {
   const products = await Product.find({ createdBy: req.user.userId }).sort(
     'createdBy'
   ); 
   if(!products){
    return res.status(StatusCodes.BAD_REQUEST).json({
        msg:"No such product present..."
    })
   }
   res.status(StatusCodes.OK).json({
    msg:"Fetched all products",
    products
   })
   } catch (error) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: error.message,
  });  
   }
}

module.exports ={
    createProduct,
    getAllProduct
}