const socket = io('http://localhost:9000');

socket.on('connect', (message) => {
    console.log('connected!!');
    socket.emit('clientConnected');
})

socket.emit('welcome', (data) => {
    console.log(data);
})