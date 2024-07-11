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
          <CustomButton
            icon-type="ADD"
            msg="Categoria"
            variant="secondary"
            @click="navigateToAddCategory"
            class="sm:w-auto"
          />
        </div>
        <div>
          <CustomButton
            icon-type="ADD"
            msg="Produto"
            variant="secondary"
            @click="navigateToAddProduct"
            class="sm:w-auto"
          />
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
import { useRouter } from 'vue-router';
import CustomButton from '@/components/CustomButton.vue';
import ProductCard from '@/components/ProductCard.vue';
import SelectInput from '@/components/SelectInput.vue';
import CustomLoading from '@/components/CustomLoading.vue';
import CustomPagination from '@/components/CustomPagination.vue';
import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import type { IProdutoCard, IPagination } from '@/types/produtos';
import type { IOptions } from '@/types/inputType';

const localSelectedCategories = ref<number>(); // Permitindo valor nulo
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

const router = useRouter();

const fetchProducts = async (page = 1) => {
  loadingProdutos.value = true;
  console.log(itemsPerPage.value);
  try {
    const response = await ProductService.get(
      page,
      itemsPerPage.value,
      localSelectedCategories.value
    );
    products.value = response.data.produtos;
    pagination.value = response.data; // Atribui diretamente a resposta para pagination
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
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
  try {
    const response = await CategoryService.get();
    categories.value = response.data.map((category) => ({
      value: category.id,
      label: category.nome
    }));
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  } finally {
    loadingCategory.value = false;
  }
};

// Handler para mudança de página
const handlePageChange = (page: number) => {
  fetchProducts(page);
};

// Handler para mudança de itens por página
const handleItemsPerPageChange = (newItemsPerPage: number) => {
  itemsPerPage.value = newItemsPerPage;
  fetchProducts(1); // Reinicia a partir da primeira página com o novo número de itens por página
};

// Watcher para atualizar a lista de produtos quando as categorias selecionadas mudarem
watch(localSelectedCategories, () => {
  fetchProducts();
});

// Chamadas iniciais para buscar produtos e categorias
onMounted(() => {
  fetchProducts();
  getAndSetCategory();
});
</script>

<style scoped>
/* Estilos adicionais conforme necessário */
</style>
