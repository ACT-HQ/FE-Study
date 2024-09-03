<template>
    <teleport to="body">
        <div v-if="isVisible" class="modal-overlay" @click="handleClose">
            <div class="modal-content" @click.stop>
                <button class="close-button" @click="handleClose">X</button>
                <slot></slot> <!-- 부모 컴포넌트에서 전달한 내용 -->
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: Boolean,
});

const emit = defineEmits(['close']);

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