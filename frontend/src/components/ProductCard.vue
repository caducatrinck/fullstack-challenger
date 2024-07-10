<template>
  <div class="bg-white p-4 rounded-lg shadow-lg">
    <img :src="productImage" alt="Product Image" class="w-full h-48 object-cover rounded-t-lg" />
    <div class="p-4">
      <h2 class="text-xl font-bold">{{ product.nome }}</h2>
      <p class="text-gray-700">Categoria: {{ product.categoria.nome }}</p>
      <p class="text-gray-700">Preço: R$ {{ formattedPrice }}</p>
      <p class="text-gray-700">Situação: {{ product.situacao ? 'Ativo' : 'Inativo' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProdutoCard } from '@/types/produtos';
import { defineProps } from 'vue';

const props = defineProps<{
  product: IProdutoCard;
}>();

const productImage = props.product.foto
  ? `/storage/produtos/${props.product.foto}`
  : 'path/to/default/image.jpg';
const formattedPrice = parseFloat(`${props.product.preco}`).toFixed(2);
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
