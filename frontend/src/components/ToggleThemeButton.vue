<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

withDefaults(
  defineProps<{
    msg?: string; // Usar 'string' ao invés de 'String'
  }>(),
  {
    msg: 'teste'
  }
);
</script>

<template>
  <button @click="toggleDark()" :class="['custom-btn', isDark ? 'dark-mode' : '']">
    {{ (msg, isDark) }}
  </button>
</template>

<style scoped>
.custom-btn {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
}

.dark-mode {
  background-color: #333; /* Cor de fundo no modo escuro */
  color: #fff; /* Cor do texto no modo escuro */
}
</style>
