<script setup lang="ts">
import type { ICustonInputProps } from '@/types/custonInput';
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<ICustonInputProps>(), {
  modelValue: '',
  placeholder: '',
  error: ''
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  localValue.value = target.value;
};
</script>

<template>
  <div class="flex flex-col h-[auto]">
    <label :for="id" class="mb-1 text-sm text-gray-600 uppercase font-sans input-label">{{
      label
    }}</label>
    <input
      :id="id"
      :type="type"
      :value="localValue"
      :placeholder="placeholder"
      @input="updateValue"
      :class="[
        error ? 'border-red-500' : 'border-gray-300',
        'h-12 w-full py-2 px-4 text-base font-sans border rounded shadow-sm transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed custom-input'
      ]"
    />
    <span v-if="error" class="text-red-500 text-xs mt-1 input-label uppercase">{{ error }}</span>
  </div>
</template>

<style scoped>
.input-label {
  font-family: var(--font-1);
}
.custom-input {
  font-family: var(--font-1);
}
</style>
