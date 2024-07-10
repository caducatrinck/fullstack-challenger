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
  <div class="form-group">
    <label class="input-label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="localValue"
      :placeholder="placeholder"
      @input="updateValue($event)"
      :class="[error ? 'is-invalid' : '', 'custom-input']"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.8rem;
  height: var(--h-2);
}
.is-invalid {
  border-color: red;
}

.input-label {
  margin-bottom: 5px; /* Espaçamento inferior entre a label e o input */
  font-size: 14px; /* Tamanho da fonte da label */
  color: #666; /* Cor do texto da label */
  text-transform: uppercase;
  font-family: var(--font-1);
}
.custom-input {
  height: var(--h-5);
  width: var(--w-5);
  font-family: var(--font-1);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
  }
}
.is-invalid {
  border-color: red;
}
.form-group {
  display: flex;
  flex-direction: column;
  height: var(--h-7);
}
</style>
