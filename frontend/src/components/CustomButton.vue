<script setup lang="ts">
withDefaults(
  defineProps<{
    msg?: string; // Usar 'string' ao invés de 'String'
    variant?: 'primary' | 'secondary' | 'terciary';
  }>(),
  {
    msg: 'teste',
    variant: 'primary'
  }
);
</script>

<template>
  <button :class="['custom-btn ' + variant]">
    {{ msg }}
  </button>
</template>

<style scoped>
.custom-btn {
  width: var(--w-5);
  height: var(--h-4);
  font-family: var(--font-2);
  font-weight: 500;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  transition: color 0.3s ease-in-out;
}

.primary {
  border: none;
  color: white;
  background-color: var(--color-primary-bg);
}

.primary:hover {
  background-color: var(--color-primary-hover);
}

.secondary {
  color: var(--color-primary-bg);
  background-color: transparent;
}

.secondary:hover {
  border-bottom: 1px solid transparent;
  color: var(--color-primary-hover);
}
</style>
