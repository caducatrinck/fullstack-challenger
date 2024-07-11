<template>
  <div class="flex flex-col h-auto">
    <label :for="id" class="font-bold mb-1 text-sm text-w text-gray-900 uppercase font">{{
      label
    }}</label>
    <div class="relative">
      <input
        type="file"
        :id="id"
        @change="handleFileChange"
        :accept="acceptedFileTypes.join(',')"
        class="hidden"
        ref="fileInput"
      />
      <div
        @click="triggerFileInput"
        class="relative w-40 h-40 border rounded shadow-sm transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed cursor-pointer custom-input overflow-hidden"
        :class="error || props.error ? 'border-red-500' : 'border-gray-300'"
      >
        <template v-if="file">
          <img :src="imageSrc" alt="Pré-visualização" class="object-cover w-full h-full" />
          <svg
            @click.stop="removeFile"
            class="absolute top-2 right-2 w-6 h-6 text-gray-500 cursor-pointer bg-white rounded-full p-1"
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
          <span class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">{{
            placeholder
          }}</span>
          <svg
            class="absolute top-2 right-2 w-6 h-6 text-gray-500 transition-transform duration-300 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </template>
      </div>
    </div>
    <span v-if="error" class="text-red-500 text-xs mt-1 font uppercase">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps<{
  id: string;
  label: string;
  modelValue: File | null;
  placeholder: string;
  maxFileSize: number;
  acceptedFileTypes: string[];
  error?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const file = ref<File | null>(props.modelValue);
const error = ref(props.error);
const fileInput = ref<HTMLInputElement | null>(null);

const imageSrc = computed(() => {
  return file.value ? URL.createObjectURL(file.value) : '';
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files ? target.files[0] : null;

  if (selectedFile) {
    if (!props.acceptedFileTypes.includes(selectedFile.type)) {
      error.value = 'Tipo de arquivo não permitido.';
      return;
    }

    if (selectedFile.size > props.maxFileSize) {
      error.value = `O arquivo deve ter no máximo ${props.maxFileSize / (1024 * 1024)} MB.`;
      return;
    }

    file.value = selectedFile;
    emit('update:modelValue', selectedFile);
    error.value = '';
  }
};

const removeFile = () => {
  file.value = null;
  emit('update:modelValue', null);
  error.value = '';
};

watch(
  () => props.modelValue,
  (newValue) => {
    file.value = newValue;
  }
);
</script>
