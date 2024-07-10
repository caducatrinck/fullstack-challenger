<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    options: { value: boolean; text: string }[];
    modelValue: boolean;
    layout: 'vertical' | 'horizontal'; // Adiciona a prop layout
  }>(),
  {
    modelValue: true,
    layout: 'vertical' // Define o layout padrão como vertical
  }
);

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const updateValue = (value: boolean) => {
  localValue.value = value;
};
</script>

<template>
  <div :class="`flex flex-col h-[auto] ${props.layout === 'horizontal' ? 'flex-row' : 'flex-col'}`">
    <label :for="id" class="text-sm text-gray-600 uppercase font-sans input-label">{{
      label
    }}</label>
    <div
      :class="`mt-1 ${props.layout === 'horizontal' ? 'flex flex-row space-x-4' : 'flex flex-col space-y-2'}`"
    >
      <div v-for="option in options" :key="option.text" class="flex items-center">
        <input
          type="radio"
          :id="option.text"
          :value="option.value"
          v-model="localValue"
          @change="updateValue(option.value)"
          class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        />
        <label :for="option.text" class="ml-3 text-base font-sans text-gray-700 input-label">{{
          option.text
        }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-label {
  font-family: var(--font-1);
}
</style>
