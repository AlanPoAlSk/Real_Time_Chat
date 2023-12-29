const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('./config/mongoose.config'); // Imports and initializes MongoDB connection
require('dotenv').config(); // Loads environment variables
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

// Define routes and middleware
app.get('/', (req, res) => {
    res.json('It seems working');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/auth', authRoutes); // Use the authentication routes
app.use('/auth/chats', chatRoutes); // Use the chat routes
app.use('/auth/messages', messageRoutes); // Use the message routes

const io = require("socket.io")(5173, {
    cors: {
    origin: "http://localhost:5173",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
    });
    });

    //when disconnect
    socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
    });
});

const port = process.env.PORT || 8000;

server.listen(port, (req,res) => {
    console.log(`WE'RE ON!!! Welcome to port ${port}`); // Server listening on port 8000
});
