const mongoose = require('mongoose');
const User = require('./userModel'); // Import User model correctly

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true,
    },
    taskDescription: {
        type: String,
        required: true,
        trim: true,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId, // Correct usage of ObjectId
        ref: 'User', // Reference to User model
        required: true,
        trim: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, // Correct usage of ObjectId
        ref: 'User', // Reference to User model
        required: true,
        trim: true,
    },
    priorityLevel: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Task', taskSchema); // Export Task model
