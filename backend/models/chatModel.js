const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true, // Determines the order of questions
    },
    followUpQuestions: {
        type: [Object],
        default: [{ question: "That worked. Take me back to the main options." }],
    },
});

module.exports = mongoose.model('Chat', chatSchema);
