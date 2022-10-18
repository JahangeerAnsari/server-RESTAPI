const express = require('express');
const cors = require('cors')
const app = express();
const taskRoutes = require('./routes/tasks.route');
const productRoutes = require('./routes/product.route');
const jwtRoutes = require('./routes/jsonwebtoken.route');
const notFoundRoute = require('./middleware/index');
const connectDB = require('./db/connection');
const errorHandlerMiddleware = require('./middleware/errorHandler');
require('express-async-errors');
require('dotenv').config();

// middleware 
app.use(cors())
app.use(express.json());

// routes

app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/basicJwt', jwtRoutes);
 app.use(notFoundRoute);
//  need to discussion
console.log("before middleware ")
 app.use(errorHandlerMiddleware);
 console.log("after middleware")

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URL);
    app.listen(port, console.log(`Server is running on ${port}`));
  } catch (error) {
    console.log("database ",error);
  }
};
start();
