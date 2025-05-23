const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const session = require('express-session');

// User Registration Route
router.post('/register', async (req, res) => {
    try {
        // Extract user data from the request body
        const { name, email, password, accountType } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password,
            accountType,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the newly created user (excluding the password)
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            accountType: newUser.accountType,
            createdAt: newUser.createdAt,
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).select('name _id email accountType password taskList').populate({path:'taskList', select:'_id taskName assignedBy assignedTo priorityLevel status createdAt dueDate', populate: [{path:'assignedBy', select: 'name'},{path:'assignedTo', select: 'name'}]});
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await user.comparePassword(password); 
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        

        res.status(200).json({
            message: 'User logged in successfully',
            _id : user._id,
            name: user.name,
            email: user.email,
            accountType: user.accountType,
            taskList: user.taskList,
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to log in' });
    }
});


// User Logout Route (clear session or token if needed)
router.get('/logout', (req, res) => {
    try {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not log out' });
            }

            // Clear the session cookie
            res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
            res.status(200).json({ message: 'User logged out successfully' });
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to log out' });
    }
});

module.exports = router;
