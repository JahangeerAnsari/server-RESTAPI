const Product = require('../models/product.model');
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: 'success',
      msg: 'all products fetched successfully',
      data: { products, nbHits: products.length },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const filterProductByValue = async (req, res) => {
  try {
    // we can add company name time for sorting the product
    const products = await Product.find({}).sort('-price');
    res.status(200).json({
      msg: 'Fetched products..',
      data: { products },
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
const selectProductByValue = async (req, res) => {
  try {
    const product = await Product.find({}).select('name');
    console.log('product', product);
    if (!product) {
      return res.status(404).json({
        msg: 'No such product found..',
      });
    } else {
      res.status(200).json({
        status: 'success',
        msg: 'product selected',
        product,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

 const limitsNumberOfProducts = async (req,res) =>{
  try {
   const products = await Product.find({})
   .sort('name')
   .select('name price')
   .limit(5).skip(1) ;
   res.status(200).json({
     msg: 'Products.....',
     data: { products, nbHits: products.length },
   });
  } catch (error) {
   res.status(500).json({
    msg:error
   }) 
  }
 }

 const filterOnNumericValue = async (req,res) =>{
   try {
    const products  =  await Product.find({price:{$gt:30}}).sort('name').select('name price')
     if(!products){
      return res.status(404).join({
        msg: `not such ${products} found`,
      });
     }else{
      res.status(200).json({
        status:"success",
        msg:'the list of prouduct',
        data:{products}
      })
     }
   } catch (error) {
    res.status(500).json({
      msg:error
    })
   }
 }
// product by quary search
const getProductsByQueary = async (req, res) => {
  try {
    const { featured, company, name, sort, fields ,numericFilters} = req.query;
    const quearyObject = {};
    if (featured) {
      quearyObject.featured = featured === 'true' ? true : false;
    }
    console.log('queryObject', quearyObject);

    if (company) {
      quearyObject.company = company;
    }
    // search based on name or single word search
    if (name) {
      quearyObject.name = { $regex: name, $options: 'i' };
    }
    // numeric filter less than greater than
     if(numericFilters){
      const operatorMap = {
        '>':'$gt',
        '>=':'$gte',
        '=':'$eq',
        '<':'$lt',
        '<=':'$lte'
      }
       const regEx = /\b(<|>|>=|=|<|<=)\b/g
       let filters = numericFilters.replace(
         regEx,
         (match) => `-${operatorMap[match]}-`
       );
  
      const  options = ['price','rating'];
      filters = filters.split(',').forEach((item) =>{
        const [field,operator,value] = item.split('-')
        if(options.includes(field)){
          quearyObject[field] = {[operator]:Number(value)}
        }
      }) 


     }
     console.log('quearyObject %%%%--->', quearyObject);
    // product sort by different value
    let result = Product.find(quearyObject);
    if (sort) {
      console.log('sort--->', sort);
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }

    // select products based on value
    if (fields) {
      console.log('fields--->', fields);
      const selectList = fields.split(',').join(' ');
      console.log('fields--->', selectList);
      result = result.select(selectList);
    } 

    // limits number of pages data show
    const page  = Number(req.body.page) || 1;
    const limit  = Number(req.query.limit) || 10
    const skip = (page -1) * limit;
    result = result.skip(skip).limit(limit);
    // 23 -product /4
    // 7 7 7 2
    //  if there is anything which not present it will feath all objects present
    const products = await result;
    if (!products) {
      return res.status(404).json({
        msg: 'No such product found sorry..',
      });
    } else {
      res.status(200).json({
        status: 'success',
        msg: 'Featched products by quary',
        data: { products, nbHits: products.length },
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createProduct = async (req, res) => {
  try {
    // checkProduct already Exits
    const isProductExits = await Product.findOne({ name: req.body.name });
    if (!isProductExits) {
      const product = await Product.create(req.body);
      console.log('product -->', product);
      res.status(201).json({
        status: 'success',
        msg: 'New product added successfully',
        data: { product },
      });
    } else {
      return res.status(200).json({
        msg: 'Product already exits Try to add another..',
        data: { isProductExits },
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    console.log('productId', productId);
    const product = await Product.findById({ _id: productId });
    if (product) {
      res.status(200).json({
        msg: 'Product Featched....',
        data: { product },
      });
    } else {
      res.status(404).json({
        msg: `No such product found with this id : ${productId}`,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log('product id', productId);
  const product = await Product.findByIdAndDelete({ _id: productId });
  if (product) {
    res.status(200).json({
      msg: 'Product deleted successfully',
    });
  } else {
    return res.status(404).json({
      msg: `No such product found with this id ${productId}`,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body
    );
    if (product) {
      res.status(200).json({
        msg: 'Product updated successfully',
        data: product,
      });
    } else {
      return res.status(404).json({
        msg: `Product not found with this id ${productId}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductsByQueary,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  filterProductByValue,
  selectProductByValue,
  limitsNumberOfProducts,
  filterOnNumericValue,
};
