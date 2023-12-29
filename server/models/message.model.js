const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema);