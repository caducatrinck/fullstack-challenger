<template>
  <div class="flex flex-col h-auto">
    <label :for="id" class="font-bold mb-1 text-sm text-gray-900 uppercase">{{ label }}</label>
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
        'h-12 w-full py-2 px-4 text-base font-sans border rounded shadow-sm transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed'
      ]"
    />
    <div class="min-h-6">
      <span v-if="isError" class="text-red-500 text-xs mt-1 font uppercase">{{ isError }}</span>
    </div>
  </div>
</template>

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

watch(
  () => props.error,
  (newError) => {
    isError.value = newError;
  }
);

watch(
  () => props.modelValue,
  (newModelValue) => {
    localValue.value = newModelValue;
  }
);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  localValue.value = value;

  if (!hasInteracted.value) {
    hasInteracted.value = true;
  }
};
</script>
