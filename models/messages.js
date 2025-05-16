const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
      conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation', // Reference to the Conversation model
        required: true,
      },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      imagePath: {   // Path to image file stored on server
        type: String,
        required: false,  // Image is optional
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('Messages', messagesSchema); // Export Messages model