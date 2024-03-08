<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section id="section2">
    <div class="carousel-box">
      <button @click="prev" class="nav-button">
        <span class="material-symbols-outlined"> arrow_back_ios </span>
      </button>
      <div class="carousel">
        <div class="side-image">
          <img :src="images[prevIndex]" alt="Previous" @click="prev" />
        </div>
        <div class="main-image">
          <img :src="images[currentIndex]" alt="Main" />
        </div>
        <div class="side-image">
          <img :src="images[nextIndex]" alt="Next" @click="next" />
        </div>
      </div>
      <button @click="next" class="nav-button">
        <span class="material-symbols-outlined"> arrow_forward_ios </span>
      </button>
    </div>
    <div class="info-box">
      <a
        >poznaj nasze<br />
        realizacje</a
      >
      <p>
        do każdego zlecenia podchodzimy ze starannością i dbałością o szczegóły
        <br />bo dla nas najważniejsze są detale
      </p>
    </div>
  </section>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      currentIndex: 0,
      images: [],
      isTransitioning: false,
    };
  },
  created() {
    this.fetchImagesFromFirebase();
  },
  computed: {
    prevIndex() {
      return (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextIndex() {
      return (this.currentIndex + 1) % this.images.length;
    },
  },
  methods: {
    prev() {
      this.currentIndex = this.prevIndex;
    },
    next() {
      this.currentIndex = this.nextIndex;
    },
    async fetchImagesFromFirebase() {
      const storage = getStorage();

      try {
        const imagesRef = ref(storage, "arteam-pictures/gallery");
        const imagesList = await listAll(imagesRef);

        for (const imageRef of imagesList.items) {
          const downloadUrl = await getDownloadURL(imageRef);
          this.images.push(downloadUrl);
        }
      } catch (error) {
        console.error("Error fetching images from Firebase:", error);
      }
    },
  },
};
</script>

<style lang="scss">
#section2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(#000000fd, #1b1b1b33);
  background-color: #3f3f3f;
  padding-top: 5rem;
  .carousel-box {
    height: auto;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .carousel {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 2rem;
      height: auto;
    }
    .main-image {
      width: 23rem;
      height: 23rem;
      box-shadow: 0px 0px 25px rgb(0, 0, 0);
      border-radius: 0.25rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;

      img {
        height: 100%;
        width: 100%;
        transition: 5s all;
      }
      img:hover {
        height: 150%;
        width: 150%;
      }
    }
    .side-image {
      height: 20rem;
      width: 20rem;
      box-shadow: 0px 0px 25px rgb(0, 0, 0);
      cursor: pointer;
      filter: blur(3px);
      border-radius: 0.5remrem;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .nav-button {
      padding: 10px;
      margin: 0 50px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      span {
        color: #e5e5e5;
      }
    }
  }
  .info-box {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    a {
      color: #e5e5e5;
      font-size: 4.5rem;
      font-weight: 700;
      text-transform: uppercase;
      font-family: "Ubuntu", sans-serif;
      text-align: center;
      filter: drop-shadow(0px 0px 3px #0d0d0d);
    }
    p {
      color: #e5e5e5;
      font-size: 1.3rem;
      font-weight: 100;
      text-transform: uppercase;
      font-family: "Ubuntu", sans-serif;
      text-align: center;
    }
  }
}
</style>
