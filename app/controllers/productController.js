const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createproducts', async (req,res) =>{
    const newProduct =req.body;
    console.log("newProduct",newProduct);
    // res.send(newProduct);
    try{
        const product = await models.product.create({
        name:newProduct.name,
        price:newProduct.price,
        description:newProduct.description,
        brand:newProduct.brand,
        countInStock:newProduct.countInStock,
        rating:newProduct.rating,
        image:newProduct.image,
        images:newProduct.images,
        isFeatured:newProduct.isFeatured,
    })
    return res.status(201).json({
        product,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    }

});

router.get('/getproducts', async (req,res) =>{
   try {const products = await models.product.findAll();
    return res.status(201).json({
        products,
    });
}catch (error) {
    return res.status(500).json({error: error.message})
}
});

router.put('/updateproduct/:id',async(req,res) =>{
    const id =req.params.id
    try{
      const product = await models.product.findByPk(id, {
     })
     if(!product){
         return res.status(500).json({
             success:false,
             message:'product not found'
         });
     }
     const updatedProduct = await models.product.update({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        brand:req.body.brand,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        image:req.body.image,
        images:req.body.images,
        isFeatured:req.body.isFeatured,
     },{
        where: { id: id}
    });
     console.log(updatedProduct)
     return res.status(201).json(updatedProduct);
     }catch(err){
         res.status(400).json({
             error: err.message,
             success: false 
         });
     }
});

router.get('/getproduct/:id', async (req,res) => {
    const id =req.params.id
    try{
        const product = await models.product.findByPk(id, {
    })
    if(!product){
        return res.status(500).json({
            success:false,
            message:'product not found'
        });
    }
    return res.status(200).json(product) 
    }catch(err){
        res.status(400).json({
            error: err.message,
            success: false 
        });
    }

});

router.delete('/deleteproduct/:id', async (req,res) => {
    const id = req.params.id
    try{
        const product = await models.product.findByPk(id,{})
    if(!product){
        res.status(500).json({
            success:false,
            message:'product not found'
        });
    }
    await product.destroy();

    }catch(err){
        res.status(400).json({
            error:err.message,
            success:false
        })
}
});


module.exports = router;