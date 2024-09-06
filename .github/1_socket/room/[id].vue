<template>
    <div>
        <h1>{{ roomName }} - {{ roomType}} 톡방</h1>
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
const roomName = ref(route.params.name);
const roomType = ref(route.params.type);
const roomLimit = ref(route.params.limit)


const socket = ref(null);
const nickname = ref('');
const message = ref('');
const chatLog = ref([]);


onMounted(() => {
    socket.value = io('http://localhost:8000/room', {
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        withCredentials: true,
    });

    socket.value.on('connect', () => {
        console.log('Connected to WebSocket server');
        joinRoom();
    });

    socket.value.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    socket.value.on('message', (message) => {
        chatLog.value.push(message);
    });
});

watch(() => route.query, (newQuery) => {
        roomId.value = newQuery.id;
        roomName.value = newQuery.name;
        roomType.value = newQuery.type;
        roomLimit.value = newQuery.limit
        joinRoom();
    },
    { immediate: true }
);

function joinRoom() {
    if (socket.value) {
        socket.value.emit('join', {
            roomId: roomId.value.toString(),  // 문자로 데이터 전달 -> 서버
            roomName: roomName.value.toString(),
            roomType: roomType.value.toString(),
            roomLimit: roomLimit.value
        });
    }
}
function sendMessage() {
    if(nickname.value){
        if(message.value) {
            if (socket.value && socket.value.connected) {
                const formattedMessage = `${nickname.value}: ${message.value}`;
                socket.value.emit('message', {
                    roomId: roomId.value.toString(),  // 문자로 데이터 전달 -> 서버
                    roomName: roomName.value.toString(),
                    roomType: roomType.value.toString(),
                    roomLimit: roomLimit.value,
                    message: formattedMessage
                });
                console.log(roomId.value)
                message.value = ''; // 메시지 전송 후 입력 필드를 비움
            } else {
                console.error('WebSocket is not connected');
            }
        } else {
            alert('말말말')
        }
    } else {
        alert('닉네임을 입력해주세요')
    }

}
</script>