require('dotenv').config();
const connectDB = require('./db/connection');
const Product = require('./models/product.model');
const jsonProducts = require('./products.json')
// in populationg we simply connect to the db to the model to automatically add
//  the json data
const start = async () =>{
    try {
     await connectDB(process.env.MONGOOSE_URL); 
     await Product.deleteMany();
     await Product.create(jsonProducts);
     console.log('connect established')  ;
     process.exit(0)
    } catch (error) {
    console.log(error)   ;
    process.exit(1) 
    }
}
start()