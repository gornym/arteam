<template>
  <nav>
    <div class="left-nav">
      <a @click="scrollToSection1"> O NAS</a>
    </div>
    <div class="middle-nav">
      <img alt="logo" :src="logoSrc" draggable="false" />
    </div>
    <div class="right-nav">
      <a @click="scrollToSection2">REALIZACJE</a>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default {
  data() {
    return {};
  },
  methods: {
    scrollToSection1() {
      document
        .getElementById("section1")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToSection2() {
      document
        .getElementById("section2")
        .scrollIntoView({ behavior: "smooth" });
    },
  },
  setup() {
    const logoSrc = ref("");

    onMounted(() => {
      fetchImage();
    });

    async function fetchImage() {
      try {
        const storage = getStorage();
        const imageRef = storageRef(storage, "arteam-pictures/1.webp");
        const url = await getDownloadURL(imageRef);

        logoSrc.value = url;

        console.log("Pomyslnie pobrano zdjecia", url);
      } catch (error) {
        console.error(error.message);
      }
    }
    return {
      logoSrc,
    };
  },
};
</script>

<style lang="scss">
nav {
  height: auto;
  width: 100%;
  background-color: #000000c0;
  box-shadow: 0px 3px 15px black;
  border-bottom: 1px solid rgb(73, 73, 73);
  position: fixed;
  top: 0;
  z-index: 15;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .left-nav,
  .right-nav {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      position: relative;
      font-size: 1.5rem;
      font-family: "Montserrat", sans-serif;
      cursor: pointer;
      color: #e5e5e5;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #e4e4e4;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform 0.4s ease;
      }
      &:hover::before {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
  .middle-nav {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 11vh;
      padding: 5px 0px;
      filter: drop-shadow(0px 0px 2px black);
    }
  }
}
</style>
