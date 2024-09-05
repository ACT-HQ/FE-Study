const express = require('express');
// HTTP 서버를 생성하는데 사용
const { createServer } = require('node:http');
// 파일 경로를 결합하는데 사용
/* join 함수의 역할 : 여러 개의 경로를 결합하여 하나의 경로를 생성
운영체제에 맞는 경로 구분자를 자동으로 사용
예) join('folder', 'file.txt')는 folder/file.txt 또는 folder₩file.txt */
const { join } = require('node:path');
// Socket.IO 서버 생성
const { Server } = require('socket.io');

const app = express();
// HTTP 서버 생성
const server = createServer(app)
// 서버 인스턴스 생성
const io = new Server(server, {
    // 설정 옵션, 연결 상태 복구 기능 활성화
    // 클라이언트와 서버 간 연결이 끊겼을 때 자동으로 재연결을 시도하고 이전 상태 복구를 도와주는 기능
    // {} : 빈 객체로 추가적인 설정이 없음을 나타냄
    connectionStateRecovery: {}
});


// 루트 경로 ('/')에 대한 GET 요청을 처리하는 라우트를 정의
// 사용자가 루트 URL 접근할 때, 서버가 index.html 파일을 클라이언트에게 전송하도록 설정하는 것
app.get('/', (req, res) => {
    // sendFile : 서버가 클라이언트에게 파일을 전송할 때 사용
    // join(__dirname, 'index.html') : 현재 실행중인 스크립트 디렉토리(__dirname)와 'index.html' 파일명을 결합하여 파일 전체의 경로를 생성
    res.sendFile(join(__dirname, 'index.html'));
});

// 클라이언트가 서버에 연결될 때 호출되는 이벤트 리스너
// 클라이언트가 연결되면 새로운 Socket 객체가 생성되고 이 객체는 해당 클라이언트와의 통신 담당
io.on('connection', async (socket) => {
    // 클라이언트가 chat message 이벤트 발생시 서버는 메세지를 수신하고 콘솔에 출력
    socket.on('chat message', async (msg)  => {
        io.emit('chat message', msg);
    });
});

// 서버를 3000번 포트에서 실행
server.listen(3000, () => {
    console.log('server running at localhost:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// 특정 방출 소켓을 제외한 모든 사람에게 메시지 전송
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});



