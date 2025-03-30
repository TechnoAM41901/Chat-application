
//import express
const express = require('express');

//import http for server creation
const http = require('http');

//creating web chat app
const socketIo = require('socket.io');

//set the directory path
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//static file sharing
app.use(express.static(path.join(__dirname, 'public')));

const chatController = require('./controllers/chatController');

app.get('/', chatController.index);

// Socket.io for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);  // Emit message with emoji to all users
    });

    socket.on('emojiMessage', (emoji) => {
        io.emit('emojiMessage', emoji);  // Emit emoji to all users
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
