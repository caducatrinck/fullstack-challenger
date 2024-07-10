<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
    <div class="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-end space-x-4">
        <CustomButton msg="Add Category" variant="primary" @click="navigateToAddCategory" />
        <CustomButton msg="Add Product" variant="primary" @click="navigateToAddProduct" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import CustomButton from '@/components/CustomButton.vue'; // Certifique-se de que o caminho esteja correto
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const categories = ref([]);
const localSelectedCategories = ref([]);
const products = ref([]);
const pagination = ref({});
const router = useRouter();

const fetchProducts = async (page = 1) => {
  const response = await productStore.fetchProducts(page, localSelectedCategories.value);
  products.value = response.data;
  pagination.value = response.pagination;
};

const fetchCategories = async (search = '') => {
  categories.value = await productStore.fetchCategories(search);
};

const navigateToAddCategory = () => {
  router.push({ name: 'add-category' });
};

const navigateToAddProduct = () => {
  router.push({ name: 'add-product' });
};

watch(localSelectedCategories, () => {
  fetchProducts();
});

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>
