const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    try{
        // const users = await User.find();
        const users = await User.find().populate('taskList', 'taskName status assignedBy assignedTo priorityLevel createdAt dueDate');
        res.json(users);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

// Get all members
router.get('/members', async (req, res) => {
    try {
        const members = await User.find({ accountType: 'member' }).populate('taskList', 'taskName status assignedBy assignedTo priorityLevel createdAt dueDate'); // Query by accountType 'member'
        if (!members.length) {
            return res.status(404).json({ message: 'No members found' });
        }
        res.json(members); // Send the list of members
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching members', error: err.message });
    }
});

// Get all members
router.get('/admin', async (req, res) => {
    try {
        const members = await User.find({ accountType: 'admin' }); // Query by accountType 'member'
        if (!members.length) {
            return res.status(404).json({ message: 'No members found' });
        }
        res.json(members); // Send the list of members
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching members', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const singleUser = await User.findById(req.params.id).populate({ path: 'taskList', select: 'taskName status assignedBy assignedTo priorityLevel createdAt dueDate', populate: [{ path: 'assignedBy', select: 'name' },{ path: 'assignedTo', select: 'name' }]});
        // const singleUser = await User.findById(req.params.id).populate('taskList', 'taskName status');
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
        response.json(updatedUser);
        res.status(201).json(newUser);
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