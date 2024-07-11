<template>
  <div class="bg-white p-4 rounded-lg shadow-lg">
    <img
      :src="product?.foto || ''"
      alt="Product Image"
      class="w-full h-48 object-cover rounded-t-lg"
    />
    <div class="p-4">
      <div class="mb-2">
        <h2 class="text-xl font-bold inline-block mr-2">{{ product.nome }}</h2>
      </div>
      <div class="mb-2 flex flex-row">
        <p class="text-gray-700 font-bold inline-block mr-2">Categoria:</p>
        <p class="text-gray-700 inline-block mr-2 ml-1 overflow-hidden whitespace-nowrap truncate">
          {{ product.categoria.nome }}
        </p>
      </div>
      <div class="mb-2 flex flex-row">
        <p class="text-gray-700 font-bold inline-block mr-2">Preço:</p>
        <p class="text-gray-700 inline-block mr-2 ml-1 overflow-hidden whitespace-nowrap truncate">
          {{ formattedPrice }}
        </p>
      </div>
      <div class="flex flex-row">
        <p class="text-gray-700 font-bold inline-block mr-2">Situação:</p>
        <p class="text-gray-700 inline-block mr-2 ml-1 overflow-hidden whitespace-nowrap truncate">
          {{ product.situacao ? 'Ativo' : 'Inativo' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProdutoCard } from '@/types/produtos';
import { centavosParaReal } from '@/utils/format';
import { computed } from 'vue';

const props = defineProps<{
  product: IProdutoCard;
}>();

const formattedPrice = computed(() => {
  return centavosParaReal(props.product.preco);
});
</script>
