import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
const port = 8000;

// HTTP 서버 생성, express 앱을 HTTP 서버로 감싸기위해 사용
const server = createServer(app);

// Socket.IO 서버 생성
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:3000', // Nuxt.js가 실행되는 도메인
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true // 쿠키를 포함한 요청을 허용하려면 true로 설정
    }
});

// CORS 설정 (Express)
app.use(cors({
    origin: 'http://localhost:3000', // Nuxt.js가 실행되는 도메인
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Socket.IO 이벤트 처리
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log('message:', message);
        io.emit('message', message); // 모든 클라이언트에 브로드캐스트
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// 간단한 API 엔드포인트 설정 (선택 사항)
app.use('/api', (req, res) => {
    res.send('Express API response');
});

// 서버 시작
server.listen(port, () => {
    console.log(`Express server and WebSocket server listening on port ${port}`);
});