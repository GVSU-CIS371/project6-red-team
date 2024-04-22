<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn class="mx-5 rounded-3 bg-blue-darken-3" @click="dialog = true">
        <v-icon>mdi-plus-box</v-icon>
        Add Product
      </v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>

    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card
        
        prepend-icon="mdi-plus-box"
        title="Add Product"
      >
        <template v-slot:actions>
          <v-col>
            <v-row>
              <v-text-field
                  v-model="newProduct.name"
                  label="Name"
                  class="mx-6"
                  variant="outlined"
                >
                </v-text-field>
            </v-row>

            <v-row>
              <v-text-field
                  v-model="newProduct.image"
                  label="Image URL"
                  class="mx-6"
                  variant="outlined"
                >
                </v-text-field>
            </v-row>

            <v-row>
              <v-text-field
                  v-model="newProduct.description"
                  label="Description"
                  class="mx-6"
                  variant="outlined"
                >
                </v-text-field>
            </v-row>
          
            <v-row class="justify-space-evenly">
              <p class="mx-6">Rating {{newProduct.rating}}</p>
              <v-slider
                min="0"
                max="5"
                step="1"
                class="mx-8"
                v-model="newProduct.rating"
              ></v-slider>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  clearable label="Price $"
                  class="mx-3"
                  variant="outlined"
                  v-model="newProduct.price"
                >
                </v-text-field>
              </v-col>
          

              <v-col>
                <v-text-field 
                  clearable label="Stock"
                  class="mx-3"
                  variant="outlined"
                  v-model="newProduct.stock"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col>
                <v-text-field
                  clearable label="category"
                  class="mx-3"
                  variant="outlined"
                  v-model="newProduct.category"
                >
                </v-text-field>
              </v-col>
            </v-row> -->

            <v-row justify="start" align="start">
                <v-btn
                class="bg-blue-lighten-5 rounded-3 text-blue-darken-1 mx-6"
                text="Add"
                @click="addProduct"
              ></v-btn>   
            </v-row>
          </v-col>
          
          
        </template>
      </v-card>
    </v-dialog>

  </v-app>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from './stores/ProductStore';

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);
var dialog = ref(false);
var sliderRating = ref(1)
var stock = ref(0)
var price = ref(0)




const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  rating: 0,
  stock: 0,
  image: '',
  category: ''
});

const productStore = useProductStore();

const addProduct = async() => {
  console.log("Adding product");
  const product = {
    name: newProduct.value.name,
    description: newProduct.value.description,
    price: newProduct.value.price,
    rating: newProduct.value.rating,
    stock: newProduct.value.stock,
    image: newProduct.value.image,
    category: newProduct.value.category
  };
  await productStore.addProduct(product);
  newProduct.value = {
    name: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    image: '',
    category: ''
  };
  dialog.value = false;
};

</script>
