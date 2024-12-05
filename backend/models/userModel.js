const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Store password as plain text
});

// Remove the pre-save hook for hashing passwords
// No password hashing will be done here

// Export the model directly without redefining the 'User' variable
module.exports = mongoose.model('User', userSchema);
