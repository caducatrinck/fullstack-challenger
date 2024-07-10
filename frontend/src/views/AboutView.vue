<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="about">
    <header>
      <img alt="Vue logo" class="logo"
src="@/assets/logo.svg" width="125" height="125"
/>

      <div class="wrapper">
        <CustomButton msg="Entrar" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style></style>
