<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Add Category</h1>
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <CustomLoading :is-loading="loading" />
        <CustomInput
          id="name"
          label="Category Name"
          v-model="name"
          type="text"
          placeholder="Enter category name"
          :error="nameError"
        />
        <RadioInput
          id="situacao"
          label="Situação"
          v-model="situacao"
          :options="[
            { value: true, text: 'Ativa' },
            { value: false, text: 'Inativa' }
          ]"
          :error="situacaoError"
        />
        <div class="flex justify-end">
          <CustomButton msg="Add Category" variant="primary" type="submit" class="w-1/2" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import CustomInput from '@/components/CustomInput.vue';
import RadioInput from '@/components/RadioInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomLoading from '@/components/CustomLoading.vue';
import { useToast } from 'vue-toast-notification';
import CategoryService from '@/services/CategoryService';

// Criando refs e inicializando o toast
const loading = ref(false);
const $toast = useToast();
const router = useRouter();

// Definindo o esquema de validação
const schema = Yup.object().shape({
  name: Yup.string().max(255, 'Máximo 255 caracteres').required('Campo obrigatório'),
  situacao: Yup.boolean().required('Campo obrigatório')
});

// Inicializando o formulário com o schema
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: '', situacao: true }
});

// Definindo os campos e suas mensagens de erro
const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: situacao, errorMessage: situacaoError } = useField<boolean>('situacao');

// Função de submissão do formulário
const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await CategoryService.create({ nome: values.name, situacao: values.situacao });
    $toast.success('Categoria adicionada com sucesso');
    router.push({ name: 'dashboard' });
  } catch (error: any) {
    $toast.error(error?.message || 'Falha ao adicionar categoria');
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
