<template>
    <h1>채팅방</h1>
    <button @click="openModal">채팅방 생성</button>
    <ul v-for="room in rooms" :key="room.id">
        <li v-if="room.name !== ''">
            <nuxt-link :to="{ path: `/room/${room.name}`, query: { id: room.id, name:room.name, type: room.type } }">{{ room.name }} / {{ room.type }} 채팅 <span v-if="room.cnt"> / {{ room.cnt}}명 - 제한 </span></nuxt-link>
        </li>
    </ul>

    <!-- emit(create-room) 으로 component에서 입력된 input값 전달   -->
    <CreateModal :isVisible="isModalVisible"  @close="closeModal" @create-room="createRoom" />
</template>

<script setup lang="ts">
import CreateModal from "~/components/CreateModal.vue";

const isModalVisible = ref(false)
const rooms = ref([
    {id : '', name : '', type : '',  cnt : ''}
])

function openModal(){
    isModalVisible.value = true
}
function closeModal(){
    isModalVisible.value = false
}

function createRoom(roomData){
    closeModal()
    const newId = rooms.value.length + 1
    rooms.value.push({id: newId, name: roomData.name, type : roomData.type, cnt : roomData.cnt })
}

// 그룹 채팅 시 인원수 제한 추가 예정
</script>
