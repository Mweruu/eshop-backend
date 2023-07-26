const models = require("../../database/models");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.post('/createuser', async (req,res) =>{
    console.log("ytyt",req.body ,)
    try{
        const user = await models.user.create({
            name:req.body.name,
            email:req.body.email,
            passwordHash:bycrypt.hashSync(req.body.password, 10),
            street:req.body.street,
            apartment:req.body.apartment,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,

    });
    return res.status(201).json({
        user,
    });
    } catch (error) {
    return res.status(500).json({error: error.message})
    }

});

// const loginUser = async (req, res) => {
//     try{
//         const user = await models.user.findOne({ where: { email: req.body.email }});
//         if(!user){
//             return res.status(400).json({
//                 error: `User not found`,
//                 success: false})
//         }
//         if(!user.confirmed){
//             throw new Error('Please confirm your email to login');
//         }
//         if(user && bycrypt.compareSync(req.body.password, user.passwordHash)){
//             const secret = process.env.SECRET
//             const token = jwt.sign(
//                 {
//                     userId: user.id,
//                     isAdmin: user.isAdmin
//                 },
//                 secret,
//                 {expiresIn: '1d'}
//             )
//             res.send({  message: 'User Authenticated',
//                         user,
//                         token,
//                         success: true });
//         }else {
//             res.send({ message: 'Wrong credentials, confirm password/email',
//                         success: false });
//         }
//     }catch(err){
//         res.status(400).json({
//             error: err.message,
//             success: false 
//         });
//     }
//   }

router.get('/getusers', async (req,res) =>{
   try {
    const users = await models.user.findAll({
        // to fetch all users and exclude the passwordHash field from the query results.
        attributes: { exclude: ['passwordHash'] }
    });
    return res.status(201).json({
        users,
    });
}catch (error) {
    return res.status(500).json({error: error.message})
}
});

router.get('/getuser/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const user = await models.user.findByPk(id,{
            attributes: { exclude: ['passwordHash'] }

        });
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
        const user = await models.user.findByPk(id, {
            name:req.body.name,
            email:req.body.email,
            passwordHash:bycrypt.hashSync(req.body.password, 10),
            street:req.body.street,
            apartment:req.body.apartment,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,

        });
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
        const user = await models.user.findByPk(id,{});
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

module.exports = 
    router
    // loginUser
