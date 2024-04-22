
<template>
  <v-card 
  class="mx-auto px-2" 
  max-width="1200px" 
  height="620px" 
  @mouseover="isHovered = true" 
  @mouseleave="isHovered = false" 
  :elevation="isHovered ? 12 : 2"
  
  >
    <v-card-title class="mt-5 ml-6">
      <b>{{ product.data.name }}</b>
    </v-card-title>
    <v-row no-gutters style="width: 475px;">
      <v-col cols="1"></v-col>
      <v-col cols="3">
        <v-rating :value="product.data.rating" max="5" readonly dense size="20">
          <template #item="{ index }">
            <v-icon v-if="index < product.data.rating" color="#FFA726" size="20">mdi-star</v-icon>
            <v-icon v-else color="grey" size="20">mdi-star</v-icon>
          </template>
        </v-rating>
      </v-col>
      <v-col cols="2">
        <v-icon color="green">mdi-cash</v-icon> ${{ product.data.price }} 
      </v-col>
      <v-col cols="2">
        <v-icon color="blue">mdi-package-variant-closed</v-icon> {{ product.data.stock }}
      </v-col>
    </v-row>
    <v-img height="350px" :src="product.data.image" contain class="mt-5"></v-img>
    <v-card-text class="ml-6 mr-6 mt-5">{{ product.data.description }}</v-card-text>
    <v-row class="justify-space-around">
      <v-col class="ma-3 v-col-auto">
        <v-btn class="bg-blue-lighten-5 text-blue-darken-5">
        Modify
        </v-btn>
      </v-col>
      <v-col class="ma-3 v-col-auto">
        <v-btn class="bg-red-lighten-4 text-red-darken-5" @click="deleteProduct(product.id)">
          Delete
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
  
</template>

<script lang="ts" setup>

import { ProductDoc } from '../types/product.ts';
import { defineProps, ref } from 'vue';
import { useProductStore } from '../stores/ProductStore';

defineProps<{
  product: ProductDoc;
}>();

const productStore = useProductStore();
async function deleteProduct(item:string){
  await productStore.deleteProduct(item);
}
const isHovered = ref(false);
//var modify = ref(false)
</script>




