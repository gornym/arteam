<template>
  <div
    id="image-track"
    :data-mouse-down-at="state.mouseDownAt"
    :data-prev-percentage="state.prevPercentage"
    @mouseenter="startAnimation"
    @mouseleave="resetAnimation"
  >
    <div class="content-box">
      <div class="content">
        <h3>poznaj</h3>
        <h3>nasze</h3>
        <h3>realizacje</h3>
      </div>
      <div class="arrow-box">
        <span
          v-for="(span, index) in spans"
          :key="index"
          class="material-symbols-outlined"
          :style="{ opacity: span.opacity, transition: span.transition }"
        >
          arrow_back_ios
        </span>
      </div>
    </div>

    <img
      v-for="(image, index) in state.images.slice(0, 4)"
      :key="index"
      :src="image.src"
      alt="sec3-img"
      class="image"
      draggable="false"
      loading="lazy"
    />
    <div class="image-tile" v-if="state.images.length > 4" @click="openModal">
      <span class="image-count">{{ state.images.length - 4 }}+</span>
    </div>
  </div>
  <div class="modal" v-if="modalOpen">
    <div class="modal-content">
      <div class="button-box">
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <div class="main-carousel-box">
        <Carousel
          :navigation="true"
          :pagination="true"
          :startAutoPlay="false"
          :timeout="3000"
          class="carousel"
          v-slot="{ currentSlide }"
        >
          <Slide v-for="(image, index) in state.images" :key="index">
            <div v-show="currentSlide === index + 1" class="slide-info">
              <img :src="image.src" alt="" />
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
} from "firebase/storage";

export default {
  setup() {
    const storage = getStorage();
    const state = reactive({
      mouseDownAt: 0,
      prevPercentage: -10,
      images: [],
    });

    const spans = ref([]);

    const startAnimation = () => {
      spans.value = Array.from({ length: 15 }, () => ({
        opacity: 0,
        transition: "opacity 0.5s",
      }));

      const reversedSpans = spans.value.slice().reverse();

      reversedSpans.forEach((span, index) => {
        setTimeout(() => {
          spans.value[spans.value.length - 1 - index].opacity = 1;
        }, index * 50);
      });
    };

    const resetAnimation = () => {
      const reversedSpans = spans.value.slice().reverse();

      reversedSpans.forEach((span, index) => {
        setTimeout(() => {
          spans.value[spans.value.length - 1 - index].opacity = 0;
        }, index * 50);
      });
    };

    const modalOpen = ref(false);

    const openModal = () => {
      modalOpen.value = true;
    };

    const closeModal = () => {
      modalOpen.value = false;
    };

    const handleOnDown = (e) => {
      state.mouseDownAt = e.clientX;
    };

    const handleOnUp = () => {
      state.mouseDownAt = 0;
      state.prevPercentage =
        document.getElementById("image-track").dataset.prevPercentage;
    };

    const handleOnMove = (e) => {
      if (!state.mouseDownAt) return;

      const mouseX = e.clientX || e.touches[0].clientX;
      const mouseDelta = parseFloat(state.mouseDownAt) - mouseX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(state.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -60
        );

      document.getElementById("image-track").dataset.prevPercentage =
        nextPercentage;

      requestAnimationFrame(() => {
        document.getElementById(
          "image-track"
        ).style.transform = `translate(${nextPercentage}%, -60%)`;

        for (const image of document
          .getElementById("image-track")
          .getElementsByClassName("image")) {
          image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
      });
    };

    const loadImagesFromPath = async () => {
      try {
        const imagesRef = storageRef(storage, "arteam-pictures/gallery");
        const imagesList = await listAll(imagesRef);

        for (const imageRef of imagesList.items) {
          const url = await getDownloadURL(imageRef);
          state.images.push({ src: url, loaded: false });
        }
      } catch (error) {
        // console.error("Error loading images:", error);
      }
    };

    const mounted = async () => {
      window.addEventListener("mousedown", handleOnDown);
      window.addEventListener("mouseup", handleOnUp);
      window.addEventListener("mousemove", handleOnMove);
      window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
      window.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));
      window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));

      await loadImagesFromPath();
    };

    const beforeUnmount = () => {
      window.removeEventListener("mousedown", handleOnDown);
      window.removeEventListener("mouseup", handleOnUp);
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("touchstart", (e) =>
        handleOnDown(e.touches[0])
      );
      window.removeEventListener("touchend", (e) => handleOnUp(e.touches[0]));
      window.removeEventListener("touchmove", (e) =>
        handleOnMove(e.touches[0])
      );
    };

    onMounted(() => {
      document.getElementById("image-track").dataset.prevPercentage =
        state.prevPercentage;
      mounted();
    });

    onUnmounted(beforeUnmount);

    return {
      state,
      handleOnDown,
      handleOnUp,
      handleOnMove,
      openModal,
      closeModal,
      modalOpen,
      spans,
      startAnimation,
      resetAnimation,
    };
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style lang="scss">
#image-track {
  display: flex;
  gap: 4vmin;
  position: relative;
  left: 0%;
  top: 0%;
  cursor: grab;
  &:hover {
    h3 {
      color: #1f1f1f;
    }
  }
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 56vmin;
  width: 100vmin;
  border-left: 2px solid #1f1f1f;
  background: linear-gradient(to right, rgba(173, 173, 173, 0.194), #0c0c0c00);
  .content {
    h3 {
      width: 100%;
      font-size: 4rem;
      text-transform: uppercase;
      color: #e5e5e5;
      font-family: "Ubuntu", sans-serif;
      font-size: 700;
      margin: 0;
      padding: 0;
      filter: drop-shadow(0px 0px 2px #1f1f1f);
      transition: 0.4s all;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 2rem;
    }
  }

  .arrow-box {
    height: 25%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-left: 1rem;

    span {
      font-size: 2rem;
      color: #1f1f1f;
      font-weight: 700;
      filter: drop-shadow(0px 0px 2px #f2f2f2);
      opacity: 0;
    }
  }
}
#image-track > .image {
  width: 40vmin;
  height: 56vmin;
  object-fit: cover;
  object-position: 100% 50%;
  box-shadow: 0px 0px 20px black;
  transition: transform 1.2s ease;
  border: 2px solid #1f1f1f;
}

#image-track > .image-tile {
  width: 40vmin;
  height: 56vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Ubuntu", sans-serif;
  box-shadow: 0px 0px 20px black;
  background-color: #333;
  cursor: pointer;
}

.image-count {
  color: #e5e5e5;
  font-size: 8rem;
}
#image-track {
  display: flex;
  gap: 4vmin;
  position: relative;
  left: 50%;
  top: 40%;
  transform: translate(-10%, -60%);
  cursor: grab;
  h3:hover {
    color: #1f1e1e;
  }
}
#image-track:active {
  cursor: grabbing;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 15;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.861);
}

.modal-content {
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .button-box {
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .close {
      color: #e5e5e5;
      float: right;
      font-size: 3rem;
      font-weight: bold;
      cursor: pointer;
      padding: 20px 20px;
      transition: 0.5s all;
      position: relative;
      z-index: 2;
    }
    .close:hover {
      transform: rotate(180deg);
    }
  }
  .main-carousel-box {
    height: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.slide-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 90%;
    object-fit: cover;
  }
}
</style>
