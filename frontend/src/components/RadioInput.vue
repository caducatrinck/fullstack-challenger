<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    options: { value: boolean; text: string }[];
    modelValue: boolean;
  }>(),
  {
    modelValue: true
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
  <div class="flex flex-col h-[auto]">
    <label :for="id" class="text-sm text-gray-600 uppercase font-sans input-label">{{
      label
    }}</label>
    <div class="flex flex-col space-y-2 mt-1">
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
