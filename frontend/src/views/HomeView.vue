<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import { useToken } from '@/stores/auth';
import { RouterLink, RouterView } from 'vue-router';

const store = useToken();
</script>

<template>
  <header>
    <div class="wrapper">
      <CustomButton :onclick="store.clearToken" msg="Logout" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
