<template>
  <section id="section2">
    <div
      class="gallery-box"
      :style="{
        transform: `translateY(-${state.scrollGalleryOffset}px) translateX(0)`,
      }"
    >
      <Gallery />
    </div>
  </section>
</template>

<script>
import Gallery from "@/components/GalleryComponent.vue";
import { reactive, onMounted, onUnmounted } from "vue";

export default {
  components: {
    Gallery,
  },
  setup() {
    const state = reactive({
      scrollGalleryOffset: 0,
      lastScrollY: 0,
    });
    const handleScroll = () => {
      window.scrollY > state.lastScrollY ? "down" : "up";

      state.scrollGalleryOffset = window.scrollY * 0.3;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss">
#section2 {
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#adadad33, #adadad33);
  background-color: #ffffff;
  .gallery-box {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    margin-top: 150vh;
  }
}
</style>
