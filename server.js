const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
const messages = [];
const users = [];
app.use(express.static(path.join(__dirname, '/client')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('login', (user) => {
        users.push({ name: user, id: socket.id })
        socket.broadcast.emit('message', { author: 'Chat Bot', content: `${user} has joined the conversation!` });
    })
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    console.log('I\'ve added a listener on message event \n');
    socket.on('disconnect', () => {
        const user = users.find((user) => { return user.id === socket.id });
        if (user) {
            const index = users.indexOf(user);
            users.splice(index, 1);
            socket.broadcast.emit('message', {
                author: 'Chat Bot',
                content: `${user.name} has left the conversation... :(`
            });
        }
    })
});
