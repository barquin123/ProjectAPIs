const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

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

        // Hash the password before saving
        newUser.password = await bcrypt.hash(newUser.password, 10);

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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Return a success message or the user data (excluding password)
        res.status(200).json({
            message: 'User logged in successfully',
            name: user.name,
            email: user.email,
            accountType: user.accountType,
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to log in' });
    }
});

// User Logout Route (clear session or token if needed)
router.get('/logout', (req, res) => {
    try {
        // Here you can clear the user's session or authentication token
        // For example, if you're using JWT, you might just inform the client to delete the token
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to log out' });
    }
});

module.exports = router;
