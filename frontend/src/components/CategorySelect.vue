<template>
  <v-select
    v-model="selected"
    :options="categories"
    multiple
    label="name"
    @search="searchCategories"
    :clearable="true"
    :searchable="true"
  />
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CategorySelect',
  components: { vSelect },
  props: {
    categories: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: this.modelValue
    };
  },
  watch: {
    selected(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    modelValue(newValue) {
      this.selected = newValue;
    }
  },
  methods: {
    searchCategories(search) {
      this.$emit('search-categories', search);
    }
  }
};
</script>

<style scoped>
/* Adicione estilos personalizados se necessário */
</style>
