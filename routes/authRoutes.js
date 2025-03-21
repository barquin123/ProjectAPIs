const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
    }catch(error){
        res.status(400).json({error: 'failed to create User'})
    }finally{
        res.status(201).json(newUser);
    }
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await
        User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }
        const isMatch = await user.comparePassword(password); 
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid credentials'});
        }  
    }catch(error){
        res.status(400).json({error: 'failed to login'})
    }finally{
        res.status(200).json({message: 'User logged in successfully'});
    }
});

router.get('/logout', async (req, res) => {
    try{

    }catch(error){
        res.status(400).json({error: 'failed to logout'})
    }finally{
        res.status(200).json({message: 'User logged out successfully'});
    }
});

module.exports = router;