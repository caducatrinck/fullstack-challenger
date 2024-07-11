<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white max-w-md mx-auto p-8 rounded-lg border border-gray-300 flex flex-col items-center"
  >
    <CustomLoading :is-loading="loading" />
    <h2 class="text-lg font-bold mb-4 uppercase">Login</h2>
    <CustomInput
      v-model="username"
      label="Usuario"
      placeholder="Usuario"
      type="text"
      id="usuario"
      :error="usernameError"
      class="mb-4 w-full"
    />
    <CustomInput
      v-model="password"
      label="Password"
      placeholder="Senha"
      type="password"
      id="password"
      :error="passwordError"
      class="mb-4 w-full"
    />
    <CustomButton
      class="mb-4 w-full h-10"
      type="button"
      variant="secondary"
      msg="Criar conta"
      @click="router.push('/register')"
    />
    <CustomButton msg="Login" type="submit" />
    <p v-if="loginError" class="text-red-500 text-sm mt-2">{{ loginError }}</p>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import * as Yup from 'yup';

import { useField, useForm } from 'vee-validate';

import { useToast } from 'vue-toast-notification';
import AuthService from '@/services/AuthService';
import { useToken } from '@/stores/auth';
import CustomInput from '@/components/UI/Input/CustomTextInput.vue';
import CustomLoading from '@/components/UI/CustomLoading.vue';
import CustomButton from '@/components/UI/Button/CustomButton.vue';
import type { IApiErroReturn } from '@/types/api';

const loginError = ref<string>('');
const $toast = useToast();
const loading = ref(false);

const router = useRouter();

const schema = Yup.object().shape({
  username: Yup.string().min(6, 'Minimo 6 caracteres').required('Campo obrigatório'),
  password: Yup.string().min(6, 'Minimo 6 caracteres').required('Campo obrigatório')
});

const { validate } = useForm({ validationSchema: schema });

const { value: username, errorMessage: usernameError } = useField<string>('username');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const store = useToken();

const onSubmit = async () => {
  try {
    await validate();
    if (usernameError.value || passwordError.value) {
      return;
    }
    loading.value = true;
    const response = await AuthService.login({
      username: username.value,
      password: password.value
    });
    $toast.success('Login efetuado com sucesso');
    store.setToken(response.data.token);
  } catch (error: any) {
    $toast.error(error.message || 'Falha ao logar');
  } finally {
    loading.value = false;
  }
};
</script>
