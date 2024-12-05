const Chat = require('../models/chatModel');

// Get all pre-written chats, sorted by order
exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find().sort({ order: 1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch chats', error: error.message });
    }
};

// Add a new chat
exports.addChat = async (req, res) => {
    try {
        const { question, response, order, followUpQuestions } = req.body;
        const newChat = new Chat({ question, response, order, followUpQuestions });
        await newChat.save();
        res.status(201).json({ message: 'Chat added successfully', newChat });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add chat', error: error.message });
    }
};

// Update response based on question order
exports.updateChatResponseByOrder = async (req, res) => {
    try {
        const { order, newResponse, newFollowUpQuestions } = req.body;
        const updateFields = { response: newResponse };
        if (newFollowUpQuestions) {
            updateFields.followUpQuestions = newFollowUpQuestions;
        }
        const chat = await Chat.findOneAndUpdate({ order }, updateFields, { new: true });
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat response updated successfully', chat });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update chat response', error: error.message });
    }
};
    