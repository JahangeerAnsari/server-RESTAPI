const express = require('express');
const app = express();

const port = 3000;
app.get('/hello',(req,res) =>{
    res.send('hello from server')
})
app.listen(port,console.log(`Server is running on ${port}`))