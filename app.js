const express = require('express');
const app = express();
const tasks = require('./routes/tasks.route');
const connectDB =require('./db/connection');
require('dotenv').config()

// middleware for req.boyd
app.use(express.json());


// routes
app.get('/hello', (req, res) => {
  res.send('hello from server');
});
app.use('/api/v1/tasks',tasks);

const port = 3000;
const start = async () =>{
    try {
     await connectDB(process.env.MONGOOSE_URL);   
     app.listen(port,console.log(`Server is running on ${port}`))
    } catch (error) {
     console.log(error)   
    }
}
start();
