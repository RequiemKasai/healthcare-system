const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const verifyToken = require('../middleware/authMiddleware');

// Route to get all chats (requires token verification)
router.get('/', verifyToken, chatController.getChats);

// Route to add a new chat (requires token verification)
router.post('/', verifyToken, chatController.addChat);

// Route to update response based on question order (requires token verification)
router.put('/update-response', verifyToken, chatController.updateChatResponseByOrder);

module.exports = router;
