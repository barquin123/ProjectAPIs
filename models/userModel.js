const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    accountType:{
        type: String,
        required: true,
        trim: true,
    },
    taskList: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task' 
    }]
});

module.exports = mongoose.model('User', userSchema);