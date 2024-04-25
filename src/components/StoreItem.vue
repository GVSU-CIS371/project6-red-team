
<template>
  <v-card 
  class="mx-auto px-2 my-1" 
  height="620px" 
  @mouseover="isHovered = true" 
  @mouseleave="isHovered = false" 
  :elevation="isHovered ? 12 : 2"
  v-if="!modify"
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
    <v-img height="300px" :src="product.data.image" contain class="mt-5"></v-img>
    <v-card-text height="100px" max-height="100px" class="ml-6 mr-6 mt-5">{{ product.data.description }}</v-card-text>
    <v-row class="justify-start">
      <v-col class="ma-3 v-col-auto" style="padding-left: 20px;">
        <v-btn class="bg-blue-lighten-5 text-blue-darken-5" @click="modify = true">
        Modify
        </v-btn>
      </v-col>
      <v-col class="ma-3 v-col-auto">
        <v-btn class="bg-red-lighten-4 text-red-darken-5" @click="confirmDelete(product)">
         Delete
         </v-btn>

      </v-col>
    </v-row>
  </v-card>
  <v-card
    class="mx-auto px-2" 
    max-width="1200px" 
    height="620px" 
    @mouseover="isHovered = true" 
    @mouseleave="isHovered = false" 
    :elevation="isHovered ? 12 : 2"
    
    v-else>
    <template v-slot:actions fill-height class="mt-6">
          <v-col class="mt-8">
            <v-row>
              <v-text-field
                  v-model="product.data.name"
                  label="Name"
                  class="mx-6"
                  variant="outlined"
                >
                </v-text-field>
            </v-row>

            <v-row>
              <v-text-field
                  v-model="product.data.image"
                  label="Image URL"
                  class="mx-6"
                  variant="outlined"
                >
                </v-text-field>
            </v-row>

            <v-row>
              <v-text-field
                  v-model="product.data.description"
                  label="Description"
                  class="mx-6"
                  variant="outlined"
                >
                </v-text-field>
            </v-row>
          
            <v-row class="justify-space-evenly">
              <p class="mx-6">Rating {{product.data.rating}}</p>
              <v-slider
                min="0"
                max="5"
                step="1"
                class="mx-8"
                v-model="product.data.rating"
              ></v-slider>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  clearable label="Price $"
                  class="mx-3"
                  variant="outlined"
                  v-model="product.data.price"
                >
                </v-text-field>
              </v-col>
          

              <v-col>
                <v-text-field 
                  clearable label="Stock"
                  class="mx-3"
                  variant="outlined"
                  v-model="product.data.stock"                 
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-combobox
                  :items="['Groceries', 'Electronics', 'Clothing']"
                  clearable label="category"
                  class="mx-3"
                  variant="outlined"
                  v-model="product.data.category"
                >
                </v-combobox>
              </v-col>
            </v-row>

            <v-row justify="space-evenly" align="start">
                <v-btn
                class="bg-blue-lighten-5 rounded-3 text-blue-darken-1 mx-6"
                text="Modify"
                @click="confirmDialogVisible = true;"
              ></v-btn> 
              <v-btn
                class="bg-red-lighten-4 rounded-3 text-red-darken-1 mx-6"
                text="Cancel"
                @click="modify=false"
              ></v-btn>    
            </v-row>
          </v-col>
          
        </template>
  </v-card>
  <confirm-dialog v-model="confirmDialogVisible" @confirm="confirmModify(product), confirmDialogVisible=false, modify=false" @cancel="cancelModification" />

</template>

<script lang="ts" setup>
import { ProductDoc } from '../types/product.ts';
import { defineProps, ref } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import ConfirmDialog from './ConfirmDialog.vue';

defineProps<{
  product: ProductDoc;
}>();

const productStore = useProductStore();


async function changeProduct(product: ProductDoc) {
  await productStore.changeProduct(product);
}

var confirmDialogVisible = ref(false);

function confirmModify(product: ProductDoc) {
  confirmDialogVisible.value = true;
  changeProduct(product);
}
async function deleteProduct(product:ProductDoc) {
  await productStore.deleteProduct(product);
}

function confirmDelete(product:ProductDoc) {
  if (window.confirm('Are you sure you want to delete this product?')) {
    deleteProduct(product);
  }
}


function cancelModification() {
  confirmDialogVisible.value = false;
}


const isHovered = ref(false);
const modify = ref(false);
</script>





