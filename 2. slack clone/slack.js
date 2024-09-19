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
        socket.on('joinRoom', (roomTitle) => {
            // Join Room
            // NOTE: roomTitle is coming from the client -> Not Safe
            socket.join(roomTitle);

            // 이 방의 인원을 보내준다.
            const sockets = await io.of(namespace.endpoint).in(roomTitle).fetchSockets();
            const socketCount = sockets.length;

            ackCallback({
                numUsers: socketCount,
            })
        })
    })
})

