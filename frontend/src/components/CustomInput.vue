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

const localValue = ref<string | null>(props.modelValue);
const isError = ref<string>(props.error);

const hasInteracted = ref(false);

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

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal === '') {
      localValue.value = '';
      hasInteracted.value = false; // Resetar a interação quando o valor está vazio
    } else {
      localValue.value = newVal;
    }
  }
);

watch(
  () => props.error,
  (newVal) => {
    if (!localValue.value) {
      isError.value = '';
    } else {
      isError.value = newVal;
    }
  }
);
</script>

<template>
  <div class="flex flex-col h-[auto]">
    <label :for="id" class="mb-1 text-sm text-gray-600 uppercase input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type === 'currency' ? 'text' : type"
      :value="
        type === 'currency' && hasInteracted && localValue
          ? formatarDinheiroBR(localValue)
          : localValue
      "
      :placeholder="placeholder"
      @input="updateValue"
      :class="[
        isError ? 'border-red-500' : 'border-gray-300',
        'h-12 w-full py-2 px-4 text-base font-sans border rounded shadow-sm transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed custom-input'
      ]"
    />
    <div class="min-h-6">
      <span v-if="isError" class="text-red-500 text-xs mt-1 font input-label uppercase">{{
        isError
      }}</span>
    </div>
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
