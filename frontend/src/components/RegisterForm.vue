<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';
import CustomLoading from './CustomLoading.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { createUser } from '@/services/userService';
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';

const $toast = useToast();
const loading = ref(false);
const loginError = ref<string>('');
const router = useRouter();

const schema = Yup.object().shape({
  username: Yup.string().min(6).required('Campo obrigatório'),
  password: Yup.string().min(6).required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Campo obrigatório')
});

useForm({ validationSchema: schema });

const { value: username, errorMessage: usernameError } = useField<string>('username');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField<string>('confirmPassword');

const onSubmit = async () => {
  loading.value = true;
  try {
    const teste = await createUser({ username: username.value, password: password.value });
    $toast.success(teste?.message || 'usuario criado');
    router.push('/login');
  } catch (error: any) {
    $toast.error(error?.message || 'Falha ao registrar');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="register-form">
    <CustomLoading :is-loading="loading" />
    <CustomButton msg="Voltar" variant="secondary" @click="router.push('/login')" />
    <h2 class="title">Registrar Conta</h2>
    <CustomInput
      v-model="username"
      label="Usuario"
      placeholder="Usuario"
      type="text"
      id="username"
      :error="usernameError"
    />
    <CustomInput
      v-model="password"
      label="Password"
      placeholder="Senha"
      type="password"
      id="password"
      :error="passwordError"
    />
    <CustomInput
      v-model="confirmPassword"
      label="Confirmar Password"
      placeholder="Confirme sua senha"
      type="password"
      id="confirmPassword"
      :error="confirmPasswordError"
    />
    <CustomButton type="submit" msg="Criar conta" />
    <p v-if="loginError" class="error">{{ loginError }}</p>
  </form>
</template>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: var(--font-size-2);
  font-family: var(--font-2);
  text-transform: uppercase;
  padding: var(--h-3);
}

.error {
  color: red;
  font-size: 0.8rem;
}
</style>
