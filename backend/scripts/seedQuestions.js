const mongoose = require('mongoose');
const Chat = require('../models/chatModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log('MongoDB Connected')).catch((err) => console.error('MongoDB connection error:', err));


// Questions and responses to add to the database
const chatData = [
    {
        question: "What should I bring to my first visit?",
        response: "Please bring your insurance card, a valid ID, and any medical records that might be relevant.",
        order: 1,
        followUpQuestions: [
            {
                question: "Do I need to fill out any forms before my visit?",
                response: "Yes, you will need to fill out a patient information form. You can do this online through our portal or in person at the clinic."
            },
            {
                question: "What should I bring if I have a chronic condition?",
                response: "If you have a chronic condition, please bring a list of your current medications and any recent medical records related to your condition."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "How can I schedule an appointment?",
        response: "You can schedule an appointment through our online portal or by calling our reception.",
        order: 2,
        followUpQuestions: [
            {
                question: "Can I choose a specific doctor when scheduling an appointment?",
                response: "Yes, you can choose a specific doctor based on their availability. Please select the doctor when booking through the portal or mention it when calling reception."
            },
            {
                question: "How far in advance can I book an appointment?",
                response: "You can book an appointment up to three months in advance. For urgent issues, we recommend calling to check for sooner availability."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "What are the operating hours of the clinic?",
        response: "The clinic operates from 9 AM to 5 PM, Monday to Friday.",
        order: 3,
        followUpQuestions: [
            {
                question: "Are you open on weekends?",
                response: "No, we are currently closed on weekends. However, we do offer virtual consultations for urgent issues on Saturdays."
            },
            {
                question: "Do you have extended hours for emergencies?",
                response: "Yes, we have extended hours for emergencies on weekdays until 8 PM. Please call ahead to confirm availability."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "Are walk-ins accepted?",
        response: "Walk-ins are accepted but are subject to availability. It is recommended to schedule an appointment in advance.",
        order: 4,
        followUpQuestions: [
            {
                question: "What types of services are available for walk-ins?",
                response: "Walk-in services include urgent care, minor injuries, and vaccinations. For specialist services, an appointment is required."
            },
            {
                question: "What are the typical wait times for walk-ins?",
                response: "Wait times for walk-ins vary depending on the day and time. On average, the wait time is between 30 minutes to 1 hour."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "Can I reschedule my appointment?",
        response: "Yes, you can reschedule your appointment through the patient portal or by contacting our office.",
        order: 5,
        followUpQuestions: [
            {
                question: "Is there a fee for rescheduling my appointment?",
                response: "There is no fee for rescheduling if it is done at least 24 hours in advance. Same-day rescheduling may incur a fee."
            },
            {
                question: "How far in advance should I reschedule to avoid a fee?",
                response: "To avoid a fee, please reschedule at least 24 hours before your original appointment time."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "Is there a fee for canceling an appointment?",
        response: "There is no fee if you cancel at least 24 hours in advance. However, same-day cancellations may incur a fee.",
        order: 6,
        followUpQuestions: [
            {
                question: "How much is the cancellation fee for same-day cancellations?",
                response: "The cancellation fee for same-day cancellations is $25."
            },
            {
                question: "How do I cancel my appointment?",
                response: "You can cancel your appointment through the patient portal or by calling our reception desk."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "What payment methods are accepted?",
        response: "We accept credit cards, debit cards, checks, and cash. You can also make payments online through our patient portal.",
        order: 7,
        followUpQuestions: [
            {
                question: "Do you accept health insurance payments?",
                response: "Yes, we accept most major health insurance plans. Please provide your insurance details during your visit."
            },
            {
                question: "How do I set up online payments?",
                response: "To set up online payments, please log in to the patient portal and navigate to the billing section."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "How do I update my personal information?",
        response: "You can update your personal information through the patient portal or by contacting our reception desk.",
        order: 8,
        followUpQuestions: [
            {
                question: "What details can I update through the portal?",
                response: "You can update your contact information, address, and emergency contact details through the portal."
            },
            {
                question: "Do I need documents to update my insurance information?",
                response: "Yes, please provide a copy of your updated insurance card when updating your insurance information."
            },
            "That worked. Take me back to the main options."
        ]
    },
    {
        question: "What insurance providers do you accept?",
        response: "We accept most major health insurance providers. Please contact our office for a full list.",
        order: 9,
        followUpQuestions: [
            {
                question: "Can I verify my insurance coverage before my visit?",
                response: "Yes, please contact our office, and we will verify your insurance coverage for you."
            },
            {
                question: "What if my insurance provider is not listed?",
                response: "If your insurance provider is not listed, you may still be eligible for out-of-network coverage. Please contact your insurance company for details."
            },
            "That worked. Take me back to the main options."
        ]
    }
];

// Function to add chat data to the database
const addChatData = async () => {
    try {
        await Chat.insertMany(chatData);
        console.log('Chat data added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding chat data:', error);
        mongoose.connection.close();
    }
};

// Execute the function to add data
addChatData();
