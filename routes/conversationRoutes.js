const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Conversation = require('../models/conversation');
const Messages = require('../models/messages');

router.post('/start-conversation', async (req, res) => {
    const { userId, recipientId } = req.body;

    try {
        // Check if a conversation already exists between these users
        let conversation = await Conversation.findOne({
            members: { $all: [userId, recipientId] }
        });

        if (!conversation) {
            // Create a new conversation
            conversation = new Conversation({
                members: [userId, recipientId]
            });
            await conversation.save();
        }

        res.status(200).json({ success: true, conversation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to start conversation' });
    }
});

router.post('/send', async (req, res) => {
    try {
        const { conversationId, senderId, receiverId, text, imagePath } = req.body;

        // Create a new message
        const newMessage = new Messages({
            conversationId,
            sender: senderId,
            receiver: receiverId,
            text,
            imagePath: imagePath || null,  // Optional image path
            timestamp: Date.now(),
        });

        // Save the message
        const savedMessage = await newMessage.save();

        // Find the conversation and add the new message to the messages array
        const conversation = await Conversation.findOne({ conversationId });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        // Add the new message ID to the conversation's messages array
        conversation.messages.push(savedMessage._id);
        await conversation.save();

        // Respond with the saved message data
        res.status(200).json(savedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending message', error: err.message });
    }
});

router.get('/:conversationId', async (req, res) => {
    try {
        // Find the conversation by conversationId and populate members and messages
        const conversation = await Conversation.findOne({ conversationId: req.params.conversationId })
            .populate('members') // Populate the members array (User data)
            .populate({
                path: 'messages', // Populate the messages array
                populate: [
                    {
                        path: 'sender', // Populate sender info
                        select: 'name' // Only select relevant fields like name and avatar
                    },
                    {
                        path: 'receiver', // Populate receiver info
                        select: 'name' // Only select relevant fields like name and avatar
                    }
                ]
            });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        // Send the full populated conversation as response
        res.status(200).json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching conversation data', error: err.message });
    }
});


module.exports = router;