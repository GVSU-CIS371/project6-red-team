
<template>
  <v-container v-if="isProductsLoaded">
  <v-row> 
    <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <store-item :product="product"></store-item>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import StoreItem from './StoreItem.vue';
import { useProductStore } from '../stores/ProductStore';
import { ref, onMounted } from 'vue';
import { ProductDoc } from '../types/product';

const ProdStore = useProductStore();
const isProductsLoaded = ref(false);
const products = ref<ProductDoc[]>([]);

async function loadProducts() {
  await ProdStore.init();
  products.value = ProdStore.products;
  isProductsLoaded.value = true;
}

// Load products when the component is mounted
onMounted(() => {
  loadProducts();
});
</script>