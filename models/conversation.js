const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
    },]
})
module.exports = mongoose.model('Conversation', ConversationSchema); // Export Conversation model