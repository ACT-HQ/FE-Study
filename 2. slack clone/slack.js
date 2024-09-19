const express = require('express');
const app = express();
const socketio = require('socket.io');
const Room = require('./classes/Room');

const namespaces = require('./data/namespace');

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000);
const io = socketio(expressServer);

// manufactured way to change an namespace without building a huge UI
app.get('/change-ns', (req, res) => {
    // udpate namespace array
    namespaces[0].addRoom(new Room(0, '여행방', 0));
    // let everyone know in this namespace, that it changed
    io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);

    res.json(namespaces[0]);
})

io.on('connection', (socket) => {
    console.log(socket.id, 'connected');

    socket.on('clientConnected', (data) => {
        console.log(socket.id, 'has connected');
    })

    socket.emit('nsList', namespaces)
})

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(`${socket.id} has connected to ${namespace.endpoint}`);
    })
})

