<template>
  <div class="bg-white p-4 rounded-lg shadow-lg">
    <img
      :src="product?.foto || ''"
      alt="Product Image"
      class="w-full h-48 object-cover rounded-t-lg"
    />
    <div class="p-4">
      <h2 class="text-xl font-bold">{{ product.nome }}</h2>
      <p class="text-gray-700">Categoria: {{ product?.categoria?.nome }}</p>
      <p class="text-gray-700">Preço: R$ {{ formattedPrice }}</p>
      <p class="text-gray-700">Situação: {{ product.situacao ? 'Ativo' : 'Inativo' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProdutoCard } from '@/types/produtos';
import { defineProps, computed } from 'vue';

const props = defineProps<{
  product: IProdutoCard;
}>();

const formattedPrice = computed(() => {
  return parseFloat(`${props.product.preco}`).toFixed(2);
});
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados conforme necessário */
</style>
