<template>
    <teleport to="body">
        <div v-if="isVisible" class="modal-overlay" @click="handleClose">
            <div class="modal-content" @click.stop>
                <button class="close-button" @click="handleClose">X</button>
                <h2>채팅 방 생성</h2>
                <div v-for="type in roomType" :key="type.name">
                    <input
                        type="radio"
                        name="roomType"
                        :value="type.name"
                        v-model="createRoomType"
                    />
                    {{ type.name }}
                </div>
                <input v-if="createRoomType === '그룹'" placeholder="인원 수" v-model="peopleCount"><br/>
                <input v-model="newRoomName" placeholder="채팅 방 이름을 입력하세요"/>
                <button @click="createRoom">생성</button>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: Boolean,
});

const roomType = ref([
    {name : '일반'},
    {name : '그룹'}
])
const createRoomType = ref('')
const newRoomName = ref('')
const peopleCount = ref('')
const emit = defineEmits(['close', 'create-room']);

const createRoom = () => {
    if(createRoomType.value){
        if(newRoomName.value){
            emit('create-room',{name : newRoomName.value, type : createRoomType.value, cnt : peopleCount.value})
            console.log(createRoomType.value)
            newRoomName.value = ''
            createRoomType.value = ''
        } else {
            alert('채팅방 이름을 입력 하세요.')
        }
    } else {
        alert('채팅방 타입을 선택 하세요.')
    }

}

const handleClose = () => {
    emit('close');
    newRoomName.value = ''
    createRoomType.value = ''
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