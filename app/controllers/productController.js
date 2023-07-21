const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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