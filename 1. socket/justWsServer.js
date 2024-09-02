const http = require('http');

const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('Im connected to the server');
})

const wss = new websocket.WebSocketServer({ server });

/**
 * 클라이언트 - 서버 통신 순서
 * 1. TCP Handshake
 * 2. 클라이언트 -> 서버 Http Request(Upgrade: websocket 헤더 포함)
 * 3. Websocket Handshake
 * 4. Websocket 연결
 */

wss.on('headers', (headers, req) => {
    /**
     *  http로 서버로 도달했지만, WebSocket Protocol로 upgrade 했다는 것을 알 수 있음.
     *
     *  콘솔 결과:
     *  headers [
     *   'HTTP/1.1 101 Switching Protocols',
     *   'Upgrade: websocket',
     *   'Connection: Upgrade',
     *   'Sec-WebSocket-Accept: PDElgnLV8ein2+TLcH5YHV+sN3g='
     *  ]
     */
    console.log('headers', headers);
})

wss.on('connection', (ws, req) => {
    /**
     * Test 코드
     */
    // console.log('req', req)
    // ws.on('message', (data) => {
    //     console.log(`${data}`);
    //     ws.send('Welcome to the Websocket server!');
    // })
    // ws.send('Connected to the server');


    /**
     * Chat App
     */

    // 새로운 유저 접속시 모든 유저에게 접속 사실 전달
    // wss.clients.forEach(client => {
    //     client.send(`새로운 유저가 접속했습니다. 현재 유저 ${wss.clients.size}`);
    // });
    wss.broadcast(`새로운 유저가 접속했습니다. 현재 유저 ${wss.clients.size}`);
    console.log(`새로운 유저 접속 ${req.socket.remoteAddress}`);

    // 유저가 메시지를 전송하면, 모든 유저에게 해당 메시지 전송
    ws.on('message', (data) => {
        wss.broadcast(data.toString());
    })
})

// broadcast 메서드 유틸화
//
wss.broadcast = (message) => {
    wss.clients.forEach((client) => {
        client.send(message);
    })
};

server.listen(8000);
