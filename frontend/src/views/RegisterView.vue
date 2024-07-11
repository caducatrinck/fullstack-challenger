<template>
  <form
    @submit.prevent="onSubmit"
    class="register-form bg-white max-w-400 mx-auto p-8 border border-gray-300 rounded-lg flex flex-col justify-center items-center"
  >
    <CustomLoading :is-loading="loading" />
    <div class="w-full flex justify-start">
      <CustomButton msg="Voltar" variant="secondary" @click="router.push('/login')" />
    </div>
    <h2 class="text-xl font-bold text-center text-gray-800 mb-4 uppercase">Registrar Conta</h2>
    <CustomInput
      v-model="username"
      label="Usuario"
      placeholder="Usuario"
      type="text"
      id="username"
      :error="usernameError"
      class="input-field"
    />
    <CustomInput
      v-model="password"
      label="Password"
      placeholder="Senha"
      type="password"
      id="password"
      :error="passwordError"
      class="input-field"
    />
    <CustomInput
      v-model="confirmPassword"
      label="Confirmar Password"
      placeholder="Confirme sua senha"
      type="password"
      id="confirmPassword"
      :error="confirmPasswordError"
      class="input-field"
    />
    <CustomButton class="w-full mt-4 h-10" type="submit" msg="Criar conta" />
    <p v-if="loginError" class="text-red-500 text-sm mt-2">{{ loginError }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import UserService from '@/services/UserService';
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import CustomButton from '@/components/UI/Button/CustomButton.vue';
import CustomInput from '@/components/UI/Input/CustomTextInput.vue';
import CustomLoading from '@/components/UI/CustomLoading.vue';
import type { IApiErroReturn } from '@/types/api';

const $toast = useToast();
const loading = ref(false);
const loginError = ref<string>('');
const router = useRouter();

const schema = Yup.object().shape({
  username: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Campo obrigatório')
});

const { validate, resetForm } = useForm({ validationSchema: schema });

const { value: username, errorMessage: usernameError } = useField<string>('username');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField<string>('confirmPassword');

const onSubmit = async () => {
  try {
    await validate();

    if (usernameError.value || passwordError.value || confirmPasswordError.value) {
      return;
    }
    loading.value = true;
    await UserService.create({
      username: username.value,
      password: password.value
    });
    $toast.success('Usuário criado!');
    resetForm();
    router.push('/login');
  } catch (error) {
    const err = error as IApiErroReturn;
    $toast.error(err.message || 'Falha ao criar usuário');
  } finally {
    loading.value = false;
  }
};
</script>
