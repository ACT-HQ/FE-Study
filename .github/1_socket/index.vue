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
    <CreateModal :isVisible="isModalVisible" :onClose="closeModal">
        <h2>채팅 방 생성</h2>
        <input v-model="newRoomName" placeholder="채팅 방 이름을 입력하세요"/>
        <button @click="createRoom">생성</button>
    </CreateModal>
</template>

<script setup lang="ts">
import CreateModal from "~/components/CreateModal.vue";

const isModalVisible = ref(false)
const newRoomName = ref('')
const rooms = ref([
    {id : '', name : ''}
])

function openModal(){
    isModalVisible.value = true
}
function closeModal(){
    isModalVisible.value = false
}


function createRoom(){
    closeModal()
    const newId = rooms.value.length + 1
    rooms.value.push({id: newId, name: `${newRoomName.value}`})
    newRoomName.value = ''
}

</script>
