const mongoose = require('mongoose');
const connectionString = `mongodb+srv://dbUser:mydatabase@cluster0.tishv.mongodb.net/Store?retryWrites=true&w=majority`;

const connectDB = (url) =>{
 return mongoose
  .connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )   
}

module.exports = connectDB;

  
/*
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.tishv.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('db connected');
  });
  
  */
