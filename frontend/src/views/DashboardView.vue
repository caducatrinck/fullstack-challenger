<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <CustomLoading :is-loading="loadingProdutos" />

    <h1 class="text-3xl font-bold mb-6 text-gray-800 ou">Produtos</h1>
    <div
      class="min-[1000px]:min-w-[900px] w-full max-w-5xl bg-white p-6 mb-4 rounded-lg shadow-lg relative"
    >
      <SelectInput
        v-model="localSelectedCategories"
        label="Filtrar por categoria"
        id="category"
        placeholder="Selecione uma categoria"
        required
        :loading="loadingCategory"
        :options="categories"
      />
      <div class="flex flex-col sm:flex-row justify-start">
        <div class="mb-2 sm:mb-0 sm:mr-2">
          <CreateCategoryModal @update:categories="getAndSetCategory" />
        </div>
        <div>
          <CreateProductModal @update:products="fetchProducts" />
          <!-- Adiciona o listener -->
        </div>
      </div>
    </div>

    <div class="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="w-full"
      />
    </div>
    <span v-if="products.length === 0" class="text-3xl font-bold mb-6 text-gray-600 ou">
      Nenhum produto cadastrado</span
    >
    <CustomPagination
      v-if="
        !loadingProdutos &&
        pagination &&
        pagination.current_page !== undefined &&
        pagination.last_page !== undefined
      "
      :total-pages="pagination.last_page"
      :current-page="pagination.current_page"
      :items-per-page="itemsPerPage"
      :items-per-page-options="[5, 10, 20, 30]"
      @update:page="handlePageChange"
      @update:itemsPerPage="handleItemsPerPageChange"
      class="mt-6"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

import ProductCard from '@/components/Produtos/ProductCard.vue';
import SelectInput from '@/components/UI/Input/CustomSelectInput.vue';
import CustomLoading from '@/components/UI/CustomLoading.vue';
import CustomPagination from '@/components/UI/CustomPagination.vue';
import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import type { IProdutoCard } from '@/types/produtos';
import type { IOptions } from '@/types/inputType';

import { useToast } from 'vue-toast-notification';
import type { IPagination } from '@/types/pagination';
import CreateCategoryModal from '@/components/Categoria/CreateCategoryModal.vue';
import CreateProductModal from '@/components/Produtos/CreateProductModal.vue';

const $toast = useToast();

const localSelectedCategories = ref<number>();
const products = ref<IProdutoCard[]>([]);
const categories = ref<IOptions[]>([]);
const loadingCategory = ref(false);
const loadingProdutos = ref(false);
const itemsPerPage = ref<number>(10);

const pagination = ref<IPagination>({
  current_page: 1,
  last_page: 0,
  per_page: itemsPerPage.value,
  total: 0,
  next_page_url: null,
  prev_page_url: null
});

const fetchProducts = async (page = 1) => {
  loadingProdutos.value = true;
  try {
    const response = await ProductService.get(
      page,
      itemsPerPage.value,
      localSelectedCategories.value || undefined
    );
    products.value = response.data.produtos;
    pagination.value = response.data;
  } catch (error) {
    $toast.error('Erro ao buscar produtos');
  } finally {
    loadingProdutos.value = false;
  }
};

const getAndSetCategory = async () => {
  loadingCategory.value = true;
  try {
    const response = await CategoryService.get();
    categories.value = response.data.map((category) => ({
      value: category.id,
      label: category.nome
    }));
  } catch (error) {
    $toast.error('Erro ao buscar categorias');
  } finally {
    loadingCategory.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchProducts(page);
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  itemsPerPage.value = newItemsPerPage;
  fetchProducts(1);
};

watch(localSelectedCategories, () => {
  fetchProducts();
});

onMounted(() => {
  fetchProducts();
  getAndSetCategory();
});
</script>
