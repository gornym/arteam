<template>
  <div class="footer-box">
    <div class="copy">
      <a class="copy-text">AR-TEAM © 2016 - 2024 All rights reserved. </a>
    </div>
    <div class="logo">
      <img
        alt="logo"
        :src="footerLogo"
        draggable="false"
        @click="scrollToSectionTop"
      />
    </div>
    <div class="social-media">
      <a class="social" href="https://www.facebook.com/arteamwykonczeniewnetrz">
        <img alt="facebook" :src="fbIcon" />
      </a>
      <a
        class="social"
        href="https://www.instagram.com/roman.arteam"
        style="padding-right: 2rem"
      >
        <img alt="instagram" :src="igIcon" />
      </a>
    </div>
  </div>
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
    scrollToSectionTop() {
      document.getElementById("header").scrollIntoView({ behavior: "smooth" });
    },
  },
  setup() {
    const footerLogo = ref("");
    const fbIcon = ref("");
    const igIcon = ref("");

    onMounted(() => {
      fetchImage();
    });

    async function fetchImage() {
      try {
        const storage = getStorage();
        const imageRef1 = storageRef(storage, "arteam-pictures/9.webp");
        const imageRef2 = storageRef(storage, "arteam-pictures/10.webp");
        const imageRef3 = storageRef(storage, "arteam-pictures/11.webp");
        const url1 = await getDownloadURL(imageRef1);
        const url2 = await getDownloadURL(imageRef2);
        const url3 = await getDownloadURL(imageRef3);

        footerLogo.value = url1;
        fbIcon.value = url2;
        igIcon.value = url3;

        console.log("Pomyslnie pobrano zdjecia", url1);
      } catch (error) {
        console.error(error.message);
      }
    }
    return {
      fbIcon,
      igIcon,
      footerLogo,
    };
  },
};
</script>

<style lang="scss">
.footer-box {
  height: 10vh;
  width: 100%;
  border-top: 1px solid white;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .copy {
    height: 100%;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .copy-text {
      padding-left: 2rem;
      color: #e3e3e3;
      font-family: "Montserrat", sans-serif;
    }
  }
  .logo {
    height: 90%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-left: 1px solid grey;
    // border-right: 1px solid grey;
    img {
      height: 70%;
    }
  }
  .social-media {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 2%;
    .social {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 2.5rem;
        transition: 0.6s all;
        padding: 5px 5px;
        border-radius: 50%;
      }
      img:hover {
        background-color: #e3e3e35a;
      }
    }
  }
}
</style>
