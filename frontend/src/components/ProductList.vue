<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
    <button @click="prevPage" :disabled="!pagination.prev">Previous</button>
    <button @click="nextPage" :disabled="!pagination.next">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    }
  },
  methods: {
    prevPage() {
      this.$emit('change-page', this.pagination.prev);
    },
    nextPage() {
      this.$emit('change-page', this.pagination.next);
    }
  }
};
</script>
