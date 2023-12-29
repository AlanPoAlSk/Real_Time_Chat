const ChatModel = require('../models/chat.model')
//createChat
//findUserChats
//findChat

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body

    try {
        const chat = await ChatModel.findOne({
            users: { $all: [firstId, secondId] }
        })

        if (chat) return res.status(200).json(chat);

        const newChat = new ChatModel({
            users: [firstId, secondId],
        });

        const response = await newChat.save();

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
};

const findUserChats = async (req, res) => {
    const userId = req.params.userId

    try {
        const chats = await ChatModel.find({
            users: { $in: userId }

        });
        res.status(200).json(chats);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params


    try {
        const chat = await ChatModel.findOne({
            users: { $all: [firstId, secondId] }

        });
        res.status(200).json(chat);

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
};

module.exports = { createChat, findUserChats, findChat };