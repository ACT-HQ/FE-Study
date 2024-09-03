<template>
    <h1>채팅방</h1>
    <button @click="openModal">+</button>
    <ul>
        <li v-for="room in rooms" :key="room.name">
            <div>
                <nuxt-link :to="`/room/${room.name}`">{{ room.name }}</nuxt-link>
            </div>
        </li>
    </ul>
    <!-- emit(create-room) 으로 component에서 입력된 input값 전달   -->
    <CreateModal :isVisible="isModalVisible"  @close="closeModal" @create-room="createRoom" />
</template>

<script setup lang="ts">
import CreateModal from "~/components/CreateModal.vue";

const isModalVisible = ref(false)
const rooms = ref([
    {id : '', name : ''}
])

function openModal(){
    isModalVisible.value = true
}
function closeModal(){
    isModalVisible.value = false
}

function createRoom(roomName){
    closeModal()
    const newId = rooms.value.length + 1
    rooms.value.push({id: newId, name: `${roomName}`})
}

</script>
