<template>
  <div class="w-full max-w-lg mx-auto mt-10">
    <CustomLoading :is-loading="loading" />
    <form @submit.prevent="handleSubmit">
      <!-- Foto -->
      <div class="mb-4">
        <ImageUpload
          v-model="formData.photo"
          label="Foto"
          id="photo"
          :max-file-size="2 * 1024 * 1024"
          :accepted-file-types="['image/png', 'image/jpeg', 'image/jpg']"
          placeholder="Selecione a imagem"
        />
      </div>

      <!-- Nome -->
      <div class="mb-4">
        <CustomInput
          v-model="formData.name"
          label="Nome"
          id="name"
          placeholder="Digite o nome do produto"
          required
        />
      </div>

      <!-- Categoria -->
      <div class="mb-4">
        <SelectInput
          v-model="formData.category"
          label="Categoria"
          id="category"
          placeholder="Selecione uma categoria"
          required
          :loading="loadingCategory"
          :options="categories"
        />
      </div>

      <!-- Preço -->
      <div class="mb-4">
        <CustomInput
          v-model="formData.price"
          type="currency"
          label="Preço"
          id="price"
          placeholder="Digite o preço do produto"
          required
        />
      </div>

      <!-- Situação -->
      <div class="mb-4 flex flex-row gap-6">
        <RadioInput
          v-model="formData.status"
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
        <CustomButton msg="Adicionar Produto" variant="primary" type="submit" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';
import RadioInput from './RadioInput.vue';
import SelectInput from './SelectInput.vue';
import ImageUpload from './ImageUpload.vue'; // Importa o componente ImageUpload
import CategoryService from '@/services/CategoryService';

import ProductService from '@/services/ProductService';
import CustomLoading from './CustomLoading.vue';

const categories = ref([{ value: '', label: '' }]);

const selectedOption = ref(null);
const formData = ref({
  name: '',
  price: '',
  photo: null,
  status: true,
  category: null
});
const loadingCategory = ref(false);
const loading = ref(false);

const handleSubmit = async () => {
  const { name, price, photo, status, category } = formData.value;

  const formDataToSend = new FormData();
  formDataToSend.append('foto', photo);
  formDataToSend.append('categoria_id', category.value);
  formDataToSend.append('nome', name);
  formDataToSend.append('preco', price.replace(/\D/g, ''));
  formDataToSend.append('situacao', status ? '1' : '0');

  // Log para verificar os valores

  try {
    loading.value = true;

    const response = await ProductService.create(formDataToSend);

    console.log('Produto adicionado:', response.data);

    // Limpe o formulário após o envio bem-sucedido
    formData.value = {
      name: '',
      price: '',
      photo: null,
      status: true,
      category: null
    };
    selectedOption.value = null;

    // Exiba uma mensagem de sucesso ou redirecione para outra página, etc.
    alert('Produto adicionado com sucesso!');
  } catch (error) {
    // Lide com erros de envio, exiba mensagens de erro, etc.
    console.error('Erro ao enviar produto:', error);
    alert('Erro ao adicionar produto. Por favor, tente novamente.');
  } finally {
    loading.value = false;
  }
};

const getAndSetCategory = async () => {
  loadingCategory.value = true;
  const response = await CategoryService.get();
  categories.value = response.data.map((category) => ({
    value: category.id,
    label: category.nome
  }));

  loadingCategory.value = false;
};

onMounted(() => {
  getAndSetCategory();
});
</script>

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
