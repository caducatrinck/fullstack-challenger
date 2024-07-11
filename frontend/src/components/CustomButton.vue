<script setup lang="ts">
withDefaults(
  defineProps<{
    msg?: string;
    variant?: 'primary' | 'secondary' | 'terciary';
    iconType?: 'ADD' | 'DEL'; // Nova prop para o tipo de ícone
  }>(),
  {
    msg: 'teste',
    variant: 'primary',
    iconType: undefined // Valor padrão para iconType
  }
);
</script>

<template>
  <button :class="['custom-btn ' + variant]">
    <template v-if="iconType === 'ADD'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2 text-blue-500"
        viewBox="0 0 20 20"
        fill="none"
      >
        <!-- Círculo preenchido -->
        <circle cx="10" cy="10" r="9" fill="currentColor" />

        <!-- Sinal de mais -->
        <path
          d="M8 10h4m-2-2v4"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>
    <template v-if="iconType === 'DEL'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9a1 1 0 00-1-1H8a1 1 0 100 2h4a1 1 0 001-1z"
          clip-rule="evenodd"
        />
      </svg>
    </template>
    {{ msg }}
  </button>
</template>

<style scoped>
.custom-btn {
  display: inline-flex;
  align-items: center; /* Para alinhar ícone e texto */

  justify-content: center;
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
  color: var(--color-primary-hover);
}

.h-5 {
  height: 1.25rem; /* 20px */
}

.w-5 {
  width: 1.25rem; /* 20px */
}

.mr-2 {
  margin-right: 0.5rem; /* 8px */
}
</style>
