<template>
  <div>
    <h1>Add Product</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Product Name:</label>
      <input v-model="name" type="text" id="name" required />

      <label for="price">Price:</label>
      <input v-model="price" type="number" id="price" required />

      <label for="category">Category:</label>
      <category-select
        :categories="categories"
        v-model="selectedCategory"
        @search-categories="fetchCategories"
      />

      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import CategorySelect from '@/components/CategorySelect.vue';
import { useProductStore } from '@/stores/productStore';

export default {
  name: 'AddProduct',
  components: { CategorySelect },
  setup() {
    const name = ref('');
    const price = ref(0);
    const selectedCategory = ref(null);
    const productStore = useProductStore();
    const categories = ref([]);

    const fetchCategories = async (search = '') => {
      categories.value = await productStore.fetchCategories(search);
    };

    const submitForm = async () => {
      await axios.post('/api/products', {
        name: name.value,
        price: price.value,
        category_id: selectedCategory.value.id
      });
      router.push({ name: 'product-dashboard' });
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      name,
      price,
      selectedCategory,
      categories,
      fetchCategories,
      submitForm
    };
  }
};
</script>
