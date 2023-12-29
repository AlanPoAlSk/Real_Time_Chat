const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    users: Array,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Chat', ChatSchema);