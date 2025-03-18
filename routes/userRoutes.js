const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const singleUser = await User.findById(req.params.id);
        res.json(singleUser);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

router.put('/:id', async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
    }catch(error){
        res.status(400).json({error: 'failed to update User'})
    }
});

router.post('/', async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
    }catch(error){
        res.status(400).json({error: 'failed to create User'}) 
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({error: 'No User found'});
        res.json({ message: 'User deleted successfully' });
    }catch(error){
        res.status(400).json({error: 'failed to delete User'})
    }
});

module.exports = router;