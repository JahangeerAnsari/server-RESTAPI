const express = require('express');
const cors = require('cors')
const app = express();
const taskRoutes = require('./routes/tasks.route');
const productRoutes = require('./routes/product.route');
const notFoundRoute = require('./middleware/index');
const connectDB = require('./db/connection');
const errorMiddleware = require('./middleware/errorHandler');
require('express-async-errors');
require('dotenv').config();

// middleware 
app.use(cors())
app.use(express.json());

// routes
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/products', productRoutes);
 app.use(notFoundRoute);
//  need to discussion
// app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URL);
    app.listen(port, console.log(`Server is running on ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
