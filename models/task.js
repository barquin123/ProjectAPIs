const mongoose = require('mongoose');
const { schema } = require('./userModel');
const userSchema = require('./userModel');
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true,
    },
    assignedBy: {
        type: schema.Types.ObjectID, 
        ref: 'User',
        required: true,
        trim: true,
    },
    assignedTo: {
        type: schema.Types.ObjectID, 
        ref: 'User',
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
    deadLine: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Task', taskSchema);