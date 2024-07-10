<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import * as Yup from 'yup';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';
import { useField, useForm } from 'vee-validate';
import CustomLoading from './CustomLoading.vue';
import { useToast } from 'vue-toast-notification';
import { login } from '@/services/authService';
import { useToken } from '@/stores/auth';

const loginError = ref<string>('');
const $toast = useToast();
const loading = ref(false);

const router = useRouter();

const schema = Yup.object().shape({
  username: Yup.string().min(6).required('Campo obrigatório'),
  password: Yup.string().min(6).required('Campo obrigatório')
});

useForm({ validationSchema: schema });

const { value: username, errorMessage: usernameError } = useField<string>('username');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const store = useToken();

const onSubmit = async () => {
  loading.value = true;
  try {
    const response = await login({ username: username.value, password: password.value });
    $toast.success(response.message || 'Login efetuado com sucesso');

    store.setToken(response.data.token);
  } catch (error: any) {
    $toast.error(error?.message || 'Falha ao logar');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <CustomLoading :is-loading="loading" />
    <h2 class="title">Login</h2>
    <CustomInput
      v-model="username"
      label="Usuario"
      placeholder="Usuario"
      type="text"
      id="usuario"
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
    <CustomButton
      type="button"
      msg="Criar conta"
      @click="router.push('/register')"
      variant="secondary"
    />
    <CustomButton msg="Login" type="submit" />
    <p v-if="loginError" class="error">{{ loginError }}</p>
  </form>
</template>

<style scoped>
.login-form {
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
