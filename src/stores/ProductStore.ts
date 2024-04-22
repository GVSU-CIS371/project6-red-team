import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import {collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore"
import {db} from "../main"

export const useProductStore = defineStore("ProductStore", {
  state: () => ({ products: <ProductDoc[]>[] }),
  getters: {
    filteredProducts(state) {
      return state.products;
    },
  },
  actions: {
    async init() {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      this.products = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data() as ProductDoc['data'] 
      }));
    },
    async addProduct(product: ProductDoc) {
      const docRef = await addDoc(collection(db, 'products'), product.data);
      this.products.push({ id: docRef.id, data: product.data });
    },
    async deleteProduct(productId: string) {
      await deleteDoc(doc(db, 'products', productId));
      this.products = this.products.filter(product => product.id !== productId);
    },
    filterByCategory(category: string) {
      this.products = this.products.filter((x) => x.data.category === category);
      return this.products; // Return the filtered array
    },
    filterByRating(minRating: number) {
      this.products = this.products.filter((x) => x.data.rating >= minRating);
      return this.products; // Return the filtered array
    },
  },
});
