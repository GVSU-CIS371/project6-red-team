import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi, fa },
  },

  components,
  directives,
});

const firebaseConfig = {
  apiKey: "AIzaSyA2F6Gzfx1RKJcT37bpPJ3sOgXZtGJcABs",
  authDomain: "cis371project6.firebaseapp.com",
  projectId: "cis371project6",
  storageBucket: "cis371project6.appspot.com",
  messagingSenderId: "706484807961",
  appId: "1:706484807961:web:78f168254cebc654627d88",
  measurementId: "G-0TVL8HHT7H"
};

const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);
const analytics = getAnalytics(app);

const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");


