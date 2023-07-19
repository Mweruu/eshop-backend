const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv/config');

const api = process.env.API_URL;

//middleware
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', (req,res) =>{
    res.send('Hello')
    // res.json({ message: "Welcome to eshop application." });

})

app.get(`${api}/products`, (req,res) =>{
    const product = {
        id:1,
        name:'Iron box',
        price:1200,
    }
    res.send(product);

})

app.post(`${api}/products`, (req,res) =>{
    const newProduct =req.body;
    console.log(newProduct);
    res.send(newProduct);

})

app.listen(3000, () =>{
    console.log('Server  is running http://localhost:3000');
})