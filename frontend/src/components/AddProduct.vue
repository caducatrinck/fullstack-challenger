<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';
import RadioInput from './RadioInput.vue';
import SelectInput from './SelectInput.vue';
import ImageUpload from './ImageUpload.vue';
import CategoryService from '@/services/CategoryService';
import ProductService from '@/services/ProductService';
import CustomLoading from './CustomLoading.vue';
import * as Yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useToast } from 'vue-toast-notification';
import type { IOptions } from '@/types/inputType';

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

const onSubmit = async () => {
  try {
    await validate();
    if (!foto.value || !categoriaId.value || !nome.value || !preco.value) {
      return;
    }

    loading.value = true;

    const formDataToSend = new FormData();
    formDataToSend.append('foto', foto.value); // A foto já está sendo tratada como arquivo
    formDataToSend.append('categoria_id', categoriaId.value);
    formDataToSend.append('nome', nome.value);
    formDataToSend.append('preco', preco.value?.replace(/\D/g, '')); // Convertendo para float
    formDataToSend.append('situacao', situacao.value ? '1' : '0'); // Enviando como string '1' ou '0'

    const response = await ProductService.create(formDataToSend);

    resetForm();

    $toast.success(response.message || 'Produto adicionado com sucesso!');
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
</script>

<template>
  <div class="w-full max-w-lg mx-auto mt-10">
    <CustomLoading :is-loading="loading" />
    <form @submit.prevent="onSubmit">
      <!-- Foto -->
      <div class="mb-2">
        <ImageUpload
          v-model="foto"
          label="Foto"
          id="foto"
          :max-file-size="2 * 1024 * 1024"
          :accepted-file-types="['image/png', 'image/jpeg', 'image/jpg']"
          placeholder="Selecione a imagem"
          :error="fotoError"
        />
      </div>

      <!-- Nome -->
      <div class="mb-2">
        <CustomInput
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
        <SelectInput
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
        <CustomInput
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
        <RadioInput
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
        <CustomButton class="w-full h-10" msg="Adicionar Produto" variant="primary" type="submit" />
      </div>
    </form>
  </div>
</template>

<style>
/* Adicionar estilos para a transição do dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
