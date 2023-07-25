const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createorder', async (req,res) => {
    try {
    const order = await models.order.create({
        name:req.body.name

    })
    return res.status(201).json({
        order,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    } 
});


router.get('/getorders', async (req,res) => {
    try {const orders = await models.order.findAll();
        return res.status(201).json({
            orders,
        });
    }catch (error) {
        return res.status(500).json({error: error.message})
    }
 
});

router.get('/getorder/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const order = await models.order.findByPk(id,{})
        if(!order){
            res.status(500).json({
                message:'order not found',
                success:false,
            });
        }
        res.status(200).json(order);
    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
        });
    }
});

router.put('/updateorder/:id', async (res,req) =>{
    const id =req.params.id;
    try{
        const order = await models.order.findByPk(id,{})
        if(!order){
            res.status(500).json({
                message:'order does not exist',
                success:false
            });
        }
        const updatedOrder = await models.order.update({
            name:req.body.name
        },
            {
                where: { id: id}
            })
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json({
            error:err.message,
            success:false
    })
    }
})

router.delete('/deleteorder/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const order = await models.order.findByPk(id,{})
        if(!order){
            res.status(500).json({
                message:'order not found',
                success:false,
            });
        }
        await order.destroy();
    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
        })
    }
});

module.exports = router
