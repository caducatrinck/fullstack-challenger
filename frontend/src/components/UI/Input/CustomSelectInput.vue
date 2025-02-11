<template>
  <div class="flex flex-col h-auto">
    <label :for="id" class="font-bold mb-1 text-sm text-gray-900 uppercase">
      {{ label }}
    </label>
    <div class="relative">
      <div
        @click="toggleDropdown"
        class="w-full h-12 py-2 px-4 text-base font-sans border rounded shadow-sm transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed flex items-center justify-between"
        :class="isError ? 'border-red-500' : 'border-gray-300'"
        :style="{ cursor: loading ? 'not-allowed' : 'pointer' }"
      >
        <span :class="selectedOption ? 'text-gray-900' : 'text-gray-400'">
          {{
            selectedOption
              ? options.find((option) => option.value === selectedOption)?.label
              : placeholder
          }}
        </span>
        <div class="flex items-center">
          <template v-if="loading">
            <div class="w-8 h-8 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="w-6 h-6 border-2 rounded-full border-blue-300 border-t-0 animate-spin"
                ></div>
              </div>
            </div>
          </template>
          <template v-else-if="selectedOption">
            <svg
              @click.stop="clearSelection"
              class="w-4 h-4 text-gray-500 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </template>
          <template v-else>
            <svg
              class="w-4 h-4 text-gray-500 transition-transform duration-300"
              :class="{ 'rotate-180': isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </template>
        </div>
      </div>
      <transition name="dropdown">
        <div
          v-if="isOpen"
          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg"
        >
          <ul>
            <li
              v-for="option in options"
              :key="option.value"
              @click="selectOption(option)"
              class="p-2 cursor-pointer hover:bg-blue-100"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="min-h-6">
      <span v-if="isError" class="text-red-500 text-xs mt-1 uppercase font-sans">
        {{ isError }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOptions } from '@/types/inputType';
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: number | null;
    placeholder: string;
    options: IOptions[];
    error?: string;
    loading: boolean;
  }>(),
  {
    modelValue: null,
    placeholder: 'Select an option',
    error: '',
    loading: false
  }
);

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const isError = ref(props.error);

const selectedOption = ref<number | null>(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    selectedOption.value = newVal;
  }
);

watch(
  () => props.error,
  (newError) => {
    isError.value = newError;
  }
);

const toggleDropdown = () => {
  if (!props.loading) {
    isOpen.value = !isOpen.value;
  }
};

const clearSelection = () => {
  if (!props.loading) {
    selectedOption.value = null;
    emit('update:modelValue', null);
    isOpen.value = false;
  }
};

const selectOption = (option: IOptions) => {
  if (!props.loading) {
    selectedOption.value = option.value;
    emit('update:modelValue', option.value);
    isOpen.value = false;
  }
};
</script>
