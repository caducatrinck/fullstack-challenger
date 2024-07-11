<template>
  <div class="flex flex-col h-auto">
    <label :for="id" class="mb-1 text-sm text-gray-600 uppercase font-sans font">{{ label }}</label>
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
        class="w-40 h-40 border rounded shadow-sm transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed cursor-pointer custom-input flex items-center justify-center overflow-hidden relative"
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
          <span class="text-gray-400">{{ placeholder }}</span>
          <svg
            class="w-6 h-6 text-gray-500 transition-transform duration-300 pointer-events-none"
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

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: File | null;
    placeholder: string;
    maxFileSize: number; // tamanho máximo do arquivo em bytes
    acceptedFileTypes: string[]; // extensões de arquivo aceitas
    error?: string;
  }>(),
  {
    modelValue: null,
    placeholder: 'Selecione um arquivo',
    maxFileSize: 2 * 1024 * 1024, // 2 MB por padrão
    acceptedFileTypes: () => ['image/png', 'image/jpeg', 'image/jpg'],
    error: ''
  }
);

const emit = defineEmits(['update:modelValue']);

const file = ref<File | null>(props.modelValue);
const error = ref(props.error);
const fileInput = ref<HTMLInputElement | null>(null); // Adiciona a referência ao input de arquivo

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
    error.value = ''; // Limpa o erro, se houver
  }
};

const removeFile = () => {
  file.value = null;
  emit('update:modelValue', null);
  error.value = ''; // Limpa o erro, se houver
};

// Sincroniza a prop modelValue com a variável local file
watch(
  () => props.modelValue,
  (newValue) => {
    file.value = newValue;
  }
);
</script>
<style scoped>
.font {
  font-family: var(--font-1);
}

.custom-input {
  /* Adicione aqui estilos adicionais, se necessário */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.custom-input img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.custom-input svg {
  position: absolute;
  top: 4px;
  right: 4px;
  background: white;
  border-radius: 50%;
  padding: 2px;
}
</style>
