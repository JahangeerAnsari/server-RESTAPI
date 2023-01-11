const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth.route');
const jobRoute = require('./routes/jobs.route');
const otpRoute = require('./routes/otp.route');
const postRoute = require('./routes/post.route');
const productRoute = require('./routes/product.route');
const commentRoute = require('./routes/comment.route');

var bodyParser = require('body-parser');
const notFoundRoute = require('./middleware/index');
const connectDB = require('./db/connection');
const {authenticationMiddleware} = require('./middleware/auth');

require('express-async-errors');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 
// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/otp', otpRoute);
// we have protected all jobs routes
app.use('/api/v1/jobs', authenticationMiddleware, jobRoute);
app.use('/api/v1/products', authenticationMiddleware, productRoute);
app.use('/api/v1/post', authenticationMiddleware, postRoute);
app.use('/api/v1/comments', authenticationMiddleware, commentRoute);

app.use(notFoundRoute);
//  need to discussion

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URL);
    app.listen(process.env.PORT, console.log(`Server is running on ${process.env.PORT}`));
  } catch (error) {
    console.log('database ', error);
  }
};
start();
