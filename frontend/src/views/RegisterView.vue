<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <RegisterForm />
  </header>
  <RouterView />
</template>

<style scoped></style>
