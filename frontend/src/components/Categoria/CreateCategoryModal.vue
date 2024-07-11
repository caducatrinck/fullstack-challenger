<template>
  <div>
    <CustomButton
      @click="openModal"
      icon-type="ADD"
      msg="Categoria"
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
        <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Cadastrar categoria</h1>
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
          <CustomLoading :is-loading="loading" />
          <CustomTextInput
            id="name"
            label="NOME DA CATEGORIA"
            v-model="nome"
            type="text"
            placeholder="Nome da categoria"
            :error="nomeError"
          />
          <CustomRadioInput
            id="situacao"
            label="Situação"
            v-model="situacao"
            :options="[
              { value: true, text: 'Ativa' },
              { value: false, text: 'Inativa' }
            ]"
          />
          <div class="flex justify-end">
            <CustomButton
              msg="Add Category"
              variant="primary"
              type="submit"
              class="w-[100%] h-[38px]"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useToast } from 'vue-toast-notification';
import * as Yup from 'yup';
import { useField, useForm } from 'vee-validate';
import CategoryService from '@/services/CategoryService';
import CustomButton from '../UI/Button/CustomButton.vue';
import CustomLoading from '../UI/CustomLoading.vue';
import CustomTextInput from '../UI/Input/CustomTextInput.vue';
import CustomRadioInput from '../UI/Input/CustomRadioInput.vue';

const categoriaSchema = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório')
    .max(255, 'O nome pode ter no máximo 255 caracteres'),
  situacao: Yup.boolean().required('A situação é obrigatória').default(true)
});

const { validate, resetForm } = useForm({ validationSchema: categoriaSchema });

const { value: nome, errorMessage: nomeError } = useField<string | null>('nome');
const situacao = ref(true);
const loading = ref(false);
const $toast = useToast();

const emit = defineEmits(['update:categories']);

const submitForm = async () => {
  try {
    await validate();
    if (!nome.value) {
      return;
    }

    loading.value = true;

    const formDataToSend = {
      nome: nome.value,
      situacao: situacao.value ? true : false
    };
    await CategoryService.create(formDataToSend);

    resetForm();
    closeModal();
    $toast.success('Categoria adicionada com sucesso!');
    emit('update:categories');
  } catch (error) {
    $toast.error('Erro ao adicionar categoria.');
  } finally {
    loading.value = false;
  }
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
