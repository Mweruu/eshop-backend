const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');


router.post('/createproducts', async (req,res) =>{
    console.log("reqbody",req.body);
    // res.send(req.body);
    try{
        const category = await models.category.findByPk(req.body.categoryId);
        if(!category){
            res.status(500).json({
                message:'categoryId not found',
                success:false
            })
        }
        const product = await models.product.create({
            id: randomUUID(),
            userId:req.body.userId,
            categoryId:req.body.categoryId,
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            richDescription:req.body.richDescription,
            brand:req.body.brand,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            image:req.body.image,
            images:req.body.images,
            // numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured,
    });
    return res.status(201).json({
        product,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    }

});

router.get('/getproducts', async (req,res) =>{
   try {const products = await models.product.findAll({
    // include:models.category
   });
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
     });
     if(!product){
         return res.status(500).json({
             success:false,
             message:'product not found'
         });
     }
     const category = await models.category.findByPk(req.body.categoryId);
        if(!category){
            res.status(500).json({
                message:'categoryId not found',
                success:false
            })
        }
    
     const updatedProduct = await models.product.update({
        id: randomUUID(),
        categoryId:req.body.categoryId,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        brand:req.body.brand,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        image:req.body.image,
        images:req.body.images,
        // numReviews:req.body.numReviews,
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
    });
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

router.get('/getproducts/:categoryId', async (req,res) => {
    const categoryId = req.params.categoryId;
    try{
        const category = await models.category.findByPk(categoryId);
        if(!category){
            res.status(500).json({
                message:'category not found',
                success:false
            })
        }

        const products = await models.product.findAll(
            { where:{categoryId}}
        );
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            error: err.message,
            success: false  
        });
    }
});

router.get('/getproducts/:userId', async (req,res) => {
    const userId = req.params.userId;
    try{
        const userId = await models.category.findByPk(userId);
        if(!userId){
            res.status(500).json({
                message:'user not found',
                success:false
            })
        }

        const products = await models.product.findAll(
            { where:{userId}}
        );
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            error: err.message,
            success: false  
        });
    }
});

router.delete('/deleteproduct/:id', async (req,res) => {
    const id = req.params.id
    try{
        const product = await models.product.findByPk(id,{});
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