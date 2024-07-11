<template>
  <div class="flex flex-col items-center">
    <div class="flex space-x-2 mb-4 items-center"></div>
    <div class="flex justify-center space-x-1">
      <select
        id="itemsPerPage"
        v-model="localItemsPerPage"
        @change="updateItemsPerPage"
        class="px-4 py-2 border !border-blue-600 rounded-lg shadow-sm outline-none focus:border-blue-500"
      >
        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="h-auto w-6 rounded-lg text-blue-500 hover:text-black transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10l3.293 3.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        v-for="page in paginationNumbers"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 rounded-lg',
          page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
        ]"
      >
        {{ page }}
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="h-auto w-6 rounded-lg text-blue-500 hover:text-black transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 14.707a1 1 0 010-1.414L15.586 10 12.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPaginationProps } from '@/types/produtos';
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<IPaginationProps>();

const emit = defineEmits(['update:page', 'update:itemsPerPage']);

const localItemsPerPage = ref<number>(props.itemsPerPage);

const paginationNumbers = computed(() => {
  const pages = [];
  const startPage = Math.max(props.currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, props.totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page);
  }
};

const updateItemsPerPage = () => {
  emit('update:itemsPerPage', localItemsPerPage.value);
};

watch(
  () => props.currentPage,
  (newPage) => {
    if (newPage > props.totalPages) {
      emit('update:page', props.totalPages);
    }
  }
);
</script>

<style scoped>
/* Estilo para o select */
select {
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition: border-color 0.2s;
}

select:focus {
  border-color: #3b82f6; /* blue-500 */
  outline: none;
}

/* Estilo para os botões de paginação */
button {
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    color 0.2s;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
