/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import "firebase/storage";

import Header from "@/components/HeaderComponent.vue";
import Nav from "@/components/NavComponent.vue";
import Section1 from "@/components/Section1Component.vue";
import Section2 from "@/components/Section2Component.vue";
import Gallery from "@/components/GalleryComponent.vue";
import Footer from "@/components/FooterComponent.vue";

const app = createApp(App);

const firebaseConfig = {
  apiKey: "AIzaSyAf42V5nVB0GAoGfXqHi20yGoPHOQWIG7E",
  authDomain: "arteam-new.firebaseapp.com",
  projectId: "arteam-new",
  storageBucket: "arteam-new.appspot.com",
  messagingSenderId: "816698438421",
  appId: "1:816698438421:web:c00e04a326ce0f040e6f1c",
};
initializeApp(firebaseConfig);

app.component("Header", Header);
app.component("Nav", Nav);
app.component("Section1", Section1);
app.component("Section2", Section2);
app.component("Gallery", Gallery);
app.component("Footer", Footer);

app.mount("#app");
