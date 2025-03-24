const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        unique: true,
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
    accountType: {
        type: String,
        required: true,
        trim: true,
    },
    taskList: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task',
    }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password); // Hash the password
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password); // Compare hashed password
};


module.exports = mongoose.model('User', userSchema); // Exporting the User model
