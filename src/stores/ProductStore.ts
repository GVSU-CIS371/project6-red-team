import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import {collection, getDocs, addDoc, deleteDoc, doc, setDoc} from "firebase/firestore"
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
    async changeProduct(product: ProductDoc) {
      const productRef = doc(db, 'products', product.id);
      try {
        await setDoc(productRef, product.data);
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index].data = product.data;
        }
      } catch (error) {
        console.error('Error updating product:', error);
        throw error; 
      }
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
