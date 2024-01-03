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
// const { Server } = require('socket.io');
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


const port = process.env.PORT || 8000;

server.listen(port, (req,res) => {
    console.log(`WE'RE ON!!! Welcome to port ${port}`); // Server listening on port 8000
});
