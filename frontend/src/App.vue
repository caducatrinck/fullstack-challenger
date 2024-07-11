<script setup lang="ts">
const store = useToken();
import { RouterView } from 'vue-router';
import { useToken } from './stores/auth';
import CustomButton from './components/UI/Button/CustomButton.vue';
</script>

<template>
  <div v-if="store.token" class="flex justify-end mr-4">
    <CustomButton variant="secondary" :onclick="store.clearToken" msg="Logout" />
  </div>
  <RouterView />
</template>
