<template>
  <section id="section2">
    <Gallery />
  </section>
</template>

<script>
import Gallery from "@/components/GalleryComponent.vue";

export default {
  components: {
    Gallery,
  },
};
</script>

<style lang="scss">
#section2 {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(#000000fd, #1b1b1b33);
  // background-color: #323232;
  background-color: black;
}
</style>
