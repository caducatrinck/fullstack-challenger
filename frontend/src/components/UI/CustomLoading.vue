<template>
  <div
    v-if="isLoadingProp"
    class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
  >
    <div
      class="w-10 h-10 border-4 border-white border-opacity-30 rounded-full border-t-blue-500 animate-spin"
    ></div>
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
