<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
  <header>
    <LoginForm />
  </header>
  <RouterView />
</template>

<style scoped></style>
