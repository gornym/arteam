<template>
  <Nav />
  <Header />
  <div class="video">
    <video
      v-if="videoSrc"
      ref="myVideo"
      autoplay
      muted
      loop
      playsinline
      @loadeddata="startVideoPlayback"
    >
      <source :src="videoSrc" type="video/mp4" />
      Twoja przeglądarka nie obsługuje tagu video.
    </video>
  </div>
  <Section1 style="margin-top: 100vh" />
  <Section2 />
  <Footer />
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Nav from "@/components/NavComponent.vue";
import Section1 from "@/components/Section1Component.vue";
import Section2 from "@/components/Section2Component.vue";
import Footer from "@/components/FooterComponent.vue";

import { ref, onMounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default {
  components: {
    Header,
    Nav,
    Section1,
    Section2,
    Footer,
  },
  setup() {
    const videoSrc = ref("");

    onMounted(() => {
      fetchImage();
    });

    async function fetchImage() {
      try {
        const storage = getStorage();
        const imageRef2 = storageRef(storage, "arteam-pictures/arteam.webm");

        const url2 = await getDownloadURL(imageRef2);

        videoSrc.value = url2;

        console.log("Pomyślnie pobrano zdjęcia", url2);
      } catch (error) {
        console.error(error.message);
      }
    }
    return {
      videoSrc,
    };
  },
};
</script>

<style lang="scss">
#app {
  user-select: none;
  width: 100%;
  height: 100%;
}
body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.video {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  background-color: #000000;
  video {
    padding-top: 5rem;
    height: 100%;
    width: 100%;
  }
}
</style>
