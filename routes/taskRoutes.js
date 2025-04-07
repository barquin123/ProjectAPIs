const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find().populate('assignedBy', 'name email').populate('assignedTo', 'name email');
        res.json(tasks);
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
})

router.get('/:id', async (req,res) => {
    try{
        const task = await Task.findById(req.params.id).populate('assignedBy', 'name email').populate('assignedTo', 'name email');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
          }
        res.json(task);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        // Find the task by ID and update it with the provided data
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,   
        {
            ...req.body,           // Include other fields from the request body
            updatedBy: req.user._id,  // This is where we add the user ID of the person updating the task
        },
         {
            new: true,  // Return the updated task instead of the old one
            runValidators: true,  // Ensure validators are run
        }).populate('assignedBy', 'name email').populate('assignedTo', 'name email').populate('updatedBy', 'name email');
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Return the updated task
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update Task' });
    }
});

router.post('/', async (req, res) => {
    try{
        const newtask = new Task(req.body);
        await newtask.save();

         // Update the taskList of the assigned user
         await User.findByIdAndUpdate(
            req.body.assignedTo,
            { $push: { taskList: newtask._id } },
            { new: true }
        );
        res.status(201).json(newtask);
    }catch(error){
        res.status(400).json({error: 'failed to create Task'})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({error: 'No Task found'});
        await User.findByIdAndUpdate(
            deletedTask.assignedTo,
            { $pull: { taskList: deletedTask._id } }
        );
        res.json({ message: 'Task deleted successfully' });
    }catch(error){
        res.status(400).json({error: 'failed to delete Task'})
    }
});

module.exports = router;