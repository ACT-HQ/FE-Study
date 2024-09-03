<template>
    <div>
        <h1>Chat</h1>
        <div>
            <input v-model="nickname" placeholder="이름" />
            <input v-model="message" placeholder="메세지" />
            <button @click="sendMessage">Send</button>
        </div>
        <div v-for="(msg, index) in chatLog" :key="index">
            {{ msg }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';

const route = useRoute();
const roomId = ref(route.params.id); // URL에서 roomId 가져오기

const socket = ref(null);
const nickname = ref('');
const message = ref('');
const chatLog = ref([]);


onMounted(() => {
    // 서버 주소와 옵션으로 소켓 연결 설정
    socket.value = io('http://localhost:8000/room', {
        reconnectionAttempts: 3,  // 재연결 시도 횟수
        reconnectionDelay: 1000,  // 재연결 딜레이(ms)
        withCredentials: true,    // CORS 설정이 서버와 일치해야 함
    });

    // 연결 성공 시 실행
    socket.value.on('connect', () => {
        console.log('Connected to WebSocket server');
        socket.value.emit('join',roomId.value)
    });

    // 연결 종료 시 실행
    socket.value.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    // 서버로부터 메시지를 수신할 때 실행
    socket.value.on('message', (message) => {
        chatLog.value.push(message);
    });
});
console.log('socketValue',socket)

watch(() => route.params.name, (roomId) => {
    roomId.value = roomId;
    if(socket.value){
        socket.value.emit('join',roomId.value)
    }
})
function sendMessage() {
    if (socket.value && socket.value.connected) {
        const formattedMessage = `${nickname.value}: ${message.value}`;
        socket.value.emit('message', { roomId: roomId.value, message : formattedMessage});
        console.log(roomId.value)
        message.value = ''; // 메시지 전송 후 입력 필드를 비움
    } else {
        console.error('WebSocket is not connected');
    }
}
</script>