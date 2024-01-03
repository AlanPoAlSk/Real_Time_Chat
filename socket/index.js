const { Server } = require('socket.io');
const { getMessages } = require('../server/controllers/message.controller');


// Create the Socket.IO server instance
const io = new Server({
    cors: 'http://localhost:5173'
    // Allow connections from this origin
});
let onlineUsers = []



io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('disconnect', () => {
        // Remove disconnected user from onlineUsers
        const disconnectedUser = onlineUsers.find(user => user.socketId === socket.id);
        if (disconnectedUser) {
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
            console.log(`User disconnected: ${disconnectedUser.userId}`);
            io.emit('getOnlineUsers', onlineUsers);
        }
    });


    socket.on('addNewUser', (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        console.log('onlineUsers', onlineUsers);

        io.emit('getOnlineUsers', onlineUsers);
    });

    // add message

    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId)

        if (user) {
            io.to(user.socketId).emit('getMessage', message)
            io.to(user.socketId).emit('getNotification', {
                senderId : message.senderId,
                isRead: false,
                date: new Date(),
            })
        };
    });

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)

        io.emit('getOnlineUsers', onlineUsers);
    })

});



io.listen(8001);


