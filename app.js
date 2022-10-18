const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./routes/auth.route")
const jobRoute = require("./routes/jobs.route")
const notFoundRoute = require('./middleware/index');
const connectDB = require('./db/connection');

require('express-async-errors');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/job',jobRoute);

app.use(notFoundRoute);
//  need to discussion

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URL);
    app.listen(port, console.log(`Server is running on ${port}`));
  } catch (error) {
    console.log('database ', error);
  }
};
start();
