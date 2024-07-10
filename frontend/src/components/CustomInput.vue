<script setup lang="ts">
import type { ICustonInputProps } from '@/types/custonInput';
import { ref, watch } from 'vue';
import { formatarDinheiroBR } from '@/utils/format';

const props = withDefaults(defineProps<ICustonInputProps>(), {
  modelValue: '',
  placeholder: '',
  error: '',
  type: 'text'
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);
const hasInteracted = ref(false); // Novo estado para rastrear a interação do usuário

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  localValue.value = value;

  if (!hasInteracted.value) {
    hasInteracted.value = true; // Marcar como interagido após a primeira entrada
  }
};
</script>

<template>
  <div class="flex flex-col h-[auto]">
    <label :for="id" class="mb-1 text-sm text-gray-600 uppercase input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type === 'currency' ? 'text' : type"
      :value="type === 'currency' && hasInteracted ? formatarDinheiroBR(localValue) : localValue"
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
