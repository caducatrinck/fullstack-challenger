<template>
  <div v-if="isLoadingProp" class="loading">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isLoading: Boolean
});

const isLoadingProp = ref(false);

watch(
  () => props.isLoading,
  (newValue) => {
    isLoadingProp.value = newValue;
  }
);
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ajuste o valor do z-index conforme necessário para garantir que o loading esteja acima de outros elementos */
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #3498db;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
