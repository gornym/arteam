/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import Header from "@/components/HeaderComponent.vue";
import NewHeader from "@/components/NewHeader.vue";
import Nav from "@/components/NavComponent.vue";
// import Section1 from "@/components/Section1Component.vue";
import NewSection1 from "@/components/NewSection1.vue";
// import NewSection2 from "@/components/NewSection2.vue";
import Section2 from "@/components/Section2Component.vue";
import Section3 from "@/components/Section3Component.vue";
import Section4 from "@/components/Section4Component.vue";
import Gallery from "@/components/GalleryComponent.vue";
import Footer from "@/components/FooterComponent.vue";

// Importuje i inicjuje Firebase w main.js
const firebaseConfig = {
  apiKey: "AIzaSyAf42V5nVB0GAoGfXqHi20yGoPHOQWIG7E",
  authDomain: "arteam-new.firebaseapp.com",
  projectId: "arteam-new",
  storageBucket: "arteam-new.appspot.com",
  messagingSenderId: "816698438421",
  appId: "1:816698438421:web:c00e04a326ce0f040e6f1c",
};
const app = createApp(App);

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.config.globalProperties.$db = db;

export { app, db };

// app.component("Header", Header);
app.component("NewHeader", NewHeader);
app.component("Nav", Nav);
// app.component("Section1", Section1);
app.component("NewSection1", NewSection1);
// app.component("NewSection2", NewSection2);
app.component("Section2", Section2);
app.component("Section3", Section3);
app.component("Section4", Section4);
app.component("Gallery", Gallery);
app.component("Footer", Footer);

app.mount("#app");
