<script setup lang="ts">
withDefaults(
  defineProps<{
    msg?: string;
    variant?: 'primary' | 'secondary';
    iconType?: 'ADD' | 'DEL';
  }>(),
  {
    msg: 'teste',
    variant: 'primary',
    iconType: undefined
  }
);
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium uppercase border-none rounded cursor-pointer transition-all duration-300',
      {
        primary: 'w-full h-[40px] text-white bg-blue-700 hover:bg-blue-900',
        secondary: 'w-full h-[40px] text-blue-700 bg-transparent hover:text-blue-900'
      }[variant]
    ]"
  >
    <template v-if="iconType === 'ADD'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2 text-blue-500"
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="9" fill="currentColor" />

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
