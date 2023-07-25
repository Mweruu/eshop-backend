const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createuser', async (req,res) =>{
    console.log("ytyt",req.body ,)
    try{
        const user = await models.user.create({
            name:req.body.name
    })
    return res.status(201).json({
        user,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    }

});

router.get('/getusers', async (req,res) =>{
   try {
    const users = await models.user.findAll();
    return res.status(201).json({
        users,
    });
}catch (error) {
    return res.status(500).json({error: error.message})
}
})

router.get('/getuser/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id,{})
        if(!user){
            res.status(500).json({
                success:false,
                message:'user not found'
            });
        }
        res.status(200).json(user)
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
}
});

router.put('/updateuser/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id, {})
        if(!user){
           res.status(500).json({ 
            message:'user not found',
            success:false});
        }
        const updatedUser = await models.user.update({
            name:req.body.name
        },{
            where: { id: id}
        })
        res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json({
        error:err.message,
        success:false
    });

    
}

});

router.delete('/deleteuser/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id,{})
        if(!user){
            res.status(500).json({
                success:false,
                message:'user not found'
            });
        }
        await user.destroy();
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
}
});

module.exports = router;