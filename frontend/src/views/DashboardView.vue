<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <CustomLoading :is-loading="loadingProdutos" />
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
    <div class="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg mb-6">
      <div class="flex justify-end space-x-4">
        <CustomButton msg="Add Category" variant="primary" @click="navigateToAddCategory" />
        <CustomButton msg="Add Product" variant="primary" @click="navigateToAddProduct" />
      </div>
      <SelectInput
        v-model="localSelectedCategories"
        label="Filtrar por categoria"
        id="category"
        placeholder="Selecione uma categoria"
        required
        :loading="loadingCategory"
        :options="categories"
      />
    </div>

    <div class="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div class="flex justify-center mt-6">
      <button
        @click="fetchProducts(pagination.current_page - 1)"
        :disabled="!pagination.prev_page_url"
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
      >
        Anterior
      </button>
      <button
        @click="fetchProducts(pagination.current_page + 1)"
        :disabled="!pagination.next_page_url"
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CustomButton from '@/components/CustomButton.vue'; // Certifique-se de que o caminho esteja correto
import ProductCard from '@/components/ProductCard.vue'; // Certifique-se de que o caminho esteja correto
import { useRouter } from 'vue-router';
import ProductService from '@/services/ProductService';
import type { IProdutoCard, IPagination } from '@/types/produtos';
import CategoryService from '@/services/CategoryService';
import SelectInput from '@/components/SelectInput.vue';
import type { IOptions } from '@/types/inputType';
import CustomLoading from '@/components/CustomLoading.vue';

const localSelectedCategories = ref<IOptions>();
const products = ref<IProdutoCard[]>([]);
const categories = ref([{ value: 0, label: '' }]);
const loadingCategory = ref(false);
const loadingProdutos = ref(false);

const pagination = ref<IPagination>({
  current_page: 0,
  last_page: 0,
  per_page: 0,
  total: 0,
  next_page_url: null,
  prev_page_url: null
});
const router = useRouter();

const fetchProducts = async (page = 1) => {
  loadingProdutos.value = true;

  try {
    const response = await ProductService.get(page, localSelectedCategories?.value?.value);
    products.value = response.data.produtos;
    pagination.value = {
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      per_page: response.data.per_page,
      total: response.data.total,
      next_page_url: response.data.next_page_url,
      prev_page_url: response.data.prev_page_url
    };
  } catch (error) {
    console.log(error);
  } finally {
    loadingProdutos.value = false;
  }
};

const navigateToAddCategory = () => {
  router.push({ name: 'add-category' });
};

const navigateToAddProduct = () => {
  router.push({ name: 'add-product' });
};
const getAndSetCategory = async () => {
  loadingCategory.value = true;
  const response = await CategoryService.get();
  categories.value = response.data.map((category) => ({
    value: category.id,
    label: category.nome
  }));

  loadingCategory.value = false;
};

watch(localSelectedCategories, () => {
  fetchProducts();
});

onMounted(() => {
  fetchProducts();
  getAndSetCategory();
});
</script>
