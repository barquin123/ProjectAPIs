const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true,
    },
    assignedBy: {
        type: String,
        required: true,
        trim: true,
    },
    assignedTo: {
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
    }
});

module.exports = mongoose.model('Task', taskSchema);