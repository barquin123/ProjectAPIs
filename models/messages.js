const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    conversationId: {  // Add the conversationId here
        type: String, // This could also be ObjectId if you want to reference the Conversation model directly
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