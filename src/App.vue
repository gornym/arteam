<template>
  <Nav />
  <!-- <Header /> -->
  <NewHeader />
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
  <NewSection1 style="margin-top: 100vh" />
  <!-- <Section1 style="margin-top: 100vh" /> -->
  <!-- <NewSection2 /> -->
  <Section2 />
  <Section3 />
  <Section4 />
  <Footer />
</template>

<script>
import "@/css/app.sass";
// import Header from "@/components/HeaderComponent.vue";
import Nav from "@/components/NavComponent.vue";
// import Section1 from "@/components/Section1Component.vue";
import NewSection1 from "@/components/NewSection1.vue";
// import NewSection2 from "@/components/NewSection2.vue";
import Section2 from "@/components/Section2Component.vue";
import Section3 from "@/components/Section3Component.vue";
import Section4 from "@/components/Section4Component.vue";
import Footer from "@/components/FooterComponent.vue";
import NewHeader from "@/components/NewHeader.vue";

import { ref, onMounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default {
  components: {
    // Header,
    Nav,
    // Section1,
    NewSection1,
    // NewSection2,
    Section2,
    Section3,
    Section4,
    Footer,
    NewHeader,
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

        // console.log("Pomyślnie pobrano zdjęcia", url2);
      } catch (error) {
        // console.error(error.message);
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
  background: linear-gradient(#5353539e, #5353539e);
  background-color: #ffffff;
  video {
    padding-top: 5rem;
    height: 87%;
    width: 90%;
  }
}
</style>
