<template>
  <div>
    <CustomButton
      @click="openModal"
      icon-type="ADD"
      msg="Adicionar Produto"
      variant="secondary"
      class="sm:w-auto"
    />

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeModal"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Adicionar Produto</h1>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
          <CustomLoading :is-loading="loading" />

          <!-- Foto -->
          <div class="mb-2">
            <CustomImageInput
              v-model="foto"
              label="Foto"
              id="foto"
              :max-file-size="2 * 1024 * 1024"
              :accepted-file-types="['image/png', 'image/jpeg', 'image/jpg']"
              placeholder="Imagem do produto"
              :error="fotoError"
            />
          </div>

          <!-- Nome -->
          <div class="mb-2">
            <CustomTextInput
              v-model="nome"
              label="Nome"
              id="nome"
              placeholder="Digite o nome do produto"
              required
              :error="nomeError"
            />
          </div>

          <!-- Categoria -->
          <div class="mb-2">
            <CustomSelectInput
              v-model="categoriaId"
              label="Categoria"
              id="categoriaId"
              placeholder="Selecione uma categoria"
              required
              :loading="loadingCategory"
              :options="categories"
              :error="categoriaIdError"
            />
          </div>

          <!-- Preço -->
          <div class="mb-2">
            <CustomTextInput
              v-model="preco"
              type="currency"
              label="Preço"
              id="preco"
              placeholder="Digite o preço do produto"
              required
              :error="precoError"
            />
          </div>

          <!-- Situação -->
          <div class="mb-4 flex flex-row gap-6">
            <CustomRadioInput
              v-model="situacao"
              id="status"
              label="Situação"
              layout="horizontal"
              :options="[
                { value: true, text: 'Ativo' },
                { value: false, text: 'Inativo' }
              ]"
            />
          </div>

          <!-- Botão de Enviar -->
          <div class="mt-6">
            <CustomButton
              class="w-full h-10"
              msg="Adicionar Produto"
              variant="primary"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import CustomButton from '../UI/Button/CustomButton.vue';
import CustomRadioInput from '../UI/Input/CustomRadioInput.vue';
import CustomSelectInput from '../UI/Input/CustomSelectInput.vue';
import CustomImageInput from '../UI/Input/CustomImageInput.vue';
import CategoryService from '@/services/CategoryService';
import ProductService from '@/services/ProductService';
import CustomLoading from '../UI/CustomLoading.vue';
import * as Yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useToast } from 'vue-toast-notification';
import type { IOptions } from '@/types/inputType';
import CustomTextInput from '../UI/Input/CustomTextInput.vue';

const produtoSchema = Yup.object().shape({
  categoriaId: Yup.number().required('A categoria é obrigatória'),
  nome: Yup.string()
    .required('O nome é obrigatório')
    .max(255, 'O nome pode ter no máximo 255 caracteres'),
  preco: Yup.string().required('O preço é obrigatório'),
  situacao: Yup.boolean().required('A situação é obrigatória').default(true),
  foto: Yup.mixed()
    .test('fileType', 'Somente imagens são permitidas', (value) => {
      return (
        value &&
        value instanceof File &&
        ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
      );
    })
    .test('fileSize', 'O arquivo deve ter no máximo 2MB', (value) => {
      return value && value instanceof File && value.size <= 2048 * 1024;
    })
});

const { validate, resetForm } = useForm({ validationSchema: produtoSchema });

const { value: categoriaId, errorMessage: categoriaIdError } = useField<string | null>(
  'categoriaId'
);
const { value: nome, errorMessage: nomeError } = useField<string | null>('nome');
const { value: preco, errorMessage: precoError } = useField<string | null>('preco');
const { value: foto, errorMessage: fotoError } = useField<File>('foto');
const situacao = ref(true);

const categories = ref<IOptions[]>([]);
const loadingCategory = ref(false);
const loading = ref(false);
const $toast = useToast();

const emit = defineEmits(['update:products']);

const onSubmit = async () => {
  try {
    await validate();
    if (!foto.value || !categoriaId.value || !nome.value || !preco.value) {
      return;
    }

    loading.value = true;

    const formDataToSend = new FormData();
    formDataToSend.append('foto', foto.value);
    formDataToSend.append('categoria_id', categoriaId.value);
    formDataToSend.append('nome', nome.value);
    formDataToSend.append('preco', preco.value?.replace(/\D/g, ''));
    formDataToSend.append('situacao', situacao.value ? '1' : '0');

    const response = await ProductService.create(formDataToSend);

    resetForm();
    closeModal();
    $toast.success(response.message || 'Produto adicionado com sucesso!');
    emit('update:products');
  } catch (error) {
    $toast.error('Erro ao adicionar produto. Por favor, tente novamente.');
  } finally {
    loading.value = false;
  }
};

const GetAndSetCategory = async () => {
  loadingCategory.value = true;
  const response = await CategoryService.get();
  categories.value = response.data.map((category) => ({
    value: category.id,
    label: category.nome
  }));
  loadingCategory.value = false;
};

onMounted(() => {
  GetAndSetCategory();
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
