const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv/config');

const api = process.env.API_URL;
const productRouter = require('./app/controllers/productController');
const categoryRouter = require('./app/controllers/categoryController');
const userRouter = require('./app/controllers/userController');
const orderRouter = require('./app/controllers/orderController');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(`${api}`, productRouter);
app.use(`${api}`, categoryRouter);
app.use(`${api}`, userRouter);
app.use(`${api}`, orderRouter);


app.get('/', (req,res) =>{
    // res.send('Hello')
    res.json({ message: "Welcome to eshop application." });

})

const port = 3000;
app.listen(port, () =>{
    console.log(`Server  is running on port ${port}`);
})