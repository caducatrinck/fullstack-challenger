import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    categories: [],
    pagination: {}
  }),
  actions: {
    async fetchProducts(page = 1, selectedCategories = []) {
      const categoryFilter = selectedCategories.map((cat) => cat.id).join(',');
      const response = await axios.get(`/api/products`, {
        params: {
          page,
          categories: categoryFilter
        }
      });

      this.products = response.data.products;
      this.pagination = response.data.pagination;
      return {
        data: this.products,
        pagination: this.pagination
      };
    },
    async fetchCategories(search = '') {
      const response = await axios.get(`/api/categories`, {
        params: {
          search
        }
      });
      this.categories = response.data;
      return this.categories;
    }
  }
});
