<template>
    <h1>채팅방</h1>
    <button @click="openModal">채팅방 생성</button>
    <ul v-for="room in rooms" :key="room.id">
        <li v-if="room.name !== ''">
            <a href="#" @click="roomClick($event,room)"> {{ room.name }} / {{ room.type }} 채팅 <span v-if="room.limit"> / {{ room.limit}}명 - 제한 </span></a>
        </li>
    </ul>

    <!-- emit(create-room) 으로 component에서 입력된 input값 전달   -->
    <CreateModal :isVisible="isModalVisible"  @close="closeModal" @create-room="createRoom" />
</template>

<script setup lang="ts">
import CreateModal from "~/components/CreateModal.vue";
import { ref, onMounted } from 'vue';
import {io} from "socket.io-client";
import {useRouter} from "vue-router";

const router = useRouter();
const socket = ref(null);
const isModalVisible = ref(false)
const rooms = ref([
    {id : '', name : '', type : '',  limit : ''}
])

onMounted(() => { // 소켓 연결
    socket.value = io('http://localhost:8000/room', {
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        withCredentials: true,
    });
});

function openModal(){
    isModalVisible.value = true
}
function closeModal(){
    isModalVisible.value = false
}

function roomClick(event, roomData){
    socket.value.off('roomStatus') // socket 이벤트 리스너 삭제 ( 이벤트 리스너 중복 방지 )

    socket.value.emit('join', { // 클릭 room data 서버로 전달
        roomId: roomData.id,
        roomName: roomData.name,
        roomType: roomData.type,
        roomLimit: roomData.limit
    });

    socket.value.on('roomStatus', (status)=>{
        if(status.isFull === true){ // 접속 인원 서버에서 확인 후 전달 받기
            console.log(status)
            alert(status.message)
            event.preventDefault();
            return;
        } else {
            router.push({
                path: `/room/${roomData.name}`,
                query: {
                    id: roomData.id,
                    name:roomData.name,
                    type: roomData.type,
                    limit: roomData.limit
                }
            })
        }
    })
}

function createRoom(roomData){ // room 생성 - component에 입려된 데이터 전달
    const newId = rooms.value.length + 1
    rooms.value.push({id: newId, name: roomData.name, type : roomData.type, limit : roomData.limit })
    closeModal()
}

</script>
