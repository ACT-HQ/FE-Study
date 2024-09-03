<template>
    <teleport to="body">
        <div v-if="isVisible" class="modal-overlay" @click="handleClose">
            <div class="modal-content" @click.stop>
                <button class="close-button" @click="handleClose">X</button>
                <h2>채팅 방 생성</h2>
                <input v-model="newRoomName" placeholder="채팅 방 이름을 입력하세요"/>
                <button @click="createRoom">생성</button>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: Boolean,
});

const newRoomName = ref('')
const emit = defineEmits(['close', 'create-room']);

const createRoom = () => {
    if(newRoomName.value){
        emit('create-room',newRoomName.value)
        newRoomName.value = ''
    }
}

const handleClose = () => {
    emit('close');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 1em;
    border-radius: 0.5em;
    position: relative;
}

.close-button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background: transparent;
    border: none;
    font-size: 1.5em;
}
</style>