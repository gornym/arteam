<template>
  <section id="new-section-1">
    <div
      class="left-box"
      :style="{
        transform: `translateY(-${state.scrollContentOffset}px) translateX(0px)`,
      }"
    >
      <h1>Kompleksowe usługi wykończeniowo-budowlane</h1>
      <h1 style="font-weight: 700">8 lat doświadczenia na rynku</h1>
      <h2>Od projektu do realizacji jedna umowa, jeden wykonawca</h2>
      <p>
        Zespół AR Team realizuje prace związane z wykończeniem wnętrz, remontami
        oraz usługami budowlanymi.<br /><br />
        Każdy projekt wykonujemy z najwyższą starannością i dbałością o
        detale.<br /><br />
        Nasze doświadczenie budowane przez wiele lat pracy w Polsce i Ukrainie
        oraz staranny dobór niezawodnych materiałów gwarantują rezultaty na
        najwyższym poziomie.
      </p>
    </div>
    <div class="right-box">
      <div class="bottom-layer">
        <img alt="section1-img" :src="sec1_img1" draggable="false" />
      </div>
      <div class="top-layer">
        <img
          alt="section1-img"
          :src="sec1_img2"
          draggable="false"
          :style="{
            transform: `translateY(-${
              state.scrollImgOffset - 120
            }px) translateX(-20vh)`,
          }"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default {
  setup() {
    const sec1_img1 = ref("");
    const sec1_img2 = ref("");
    const state = reactive({
      scrollContentOffset: 0,
      scrollImgOffset: 0,
      lastScrollY: 0,
    });

    const handleScroll = () => {
      window.scrollY > state.lastScrollY ? "down" : "up";

      state.scrollContentOffset = window.scrollY * 0.3;
      state.scrollImgOffset = window.scrollY * 0.3;

      state.lastScrollY = window.scrollY;
    };

    onMounted(() => {
      fetchImage();
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    async function fetchImage() {
      try {
        const storage = getStorage();
        const imageRef1 = storageRef(storage, "arteam-pictures/6.webp");
        const imageRef2 = storageRef(storage, "arteam-pictures/7.webp");
        const url1 = await getDownloadURL(imageRef1);
        const url2 = await getDownloadURL(imageRef2);

        sec1_img1.value = url1;
        sec1_img2.value = url2;
      } catch (error) {
        // console.error(error.message);
      }
    }
    return {
      sec1_img1,
      sec1_img2,
      state,
    };
  },
};
</script>

<style lang="scss">
#new-section-1 {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: linear-gradient(#5353539e, #adadad33);
  background-color: #ffffff;
  box-shadow: 0px -5px 15px #5353539e;
  .left-box,
  .right-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .left-box {
    width: 100%;
    margin-top: 60vh;
    transition: transform 0.3s ease;
    justify-content: flex-end;
    h1,
    h2 {
      color: #1f1f1f;
      padding-left: 5rem;
      margin: 10px 0px;
      font-size: 1.7rem;
      font-weight: 100;
      font-family: "Ubuntu", sans-serif;
      transform: translateY(-100%);
    }
    h2 {
      margin-bottom: 5%;
    }
    p {
      color: #1f1f1f;
      padding-left: 5rem;
      margin-top: 60px;
      font-size: 1.3rem;
      font-weight: 100;
      font-family: "Ubuntu", sans-serif;
      max-width: 70%;
      transform: translateY(-33%);
    }
  }
  .right-box {
    width: 30%;
    position: relative;
    .bottom-layer,
    .top-layer {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
    .bottom-layer {
      z-index: 0;
      img {
        height: 100%;
        width: 100%;
        filter: blur(3px);
      }
    }
    .top-layer {
      z-index: 1;
      img {
        height: 60%;
        width: 120%;
        border: 1px solid #1f1f1f;
        box-shadow: 0px 0px 15px black;
        transform: translate(-30%, 0%);
        margin-top: 70vh;
      }
    }
  }
}
</style>
