<template>
  <header id="header">
    <div
      class="box1"
      :style="{ transform: 'translateY(' + scrollBox1Offset + 'px)' }"
    >
      <img alt="background" src="@/assets/tlo.png" draggable="false" />
    </div>

    <div
      class="box2"
      :style="{
        transform: `translateY(${translateY}px) translateX(${translateX}px) translateY(${scrollBox2Offset}px) translateX(${scrollBox2Offset}px)`,
      }"
    >
      <img alt="background" src="@/assets/3.png" draggable="false" />
    </div>

    <div
      class="box3"
      :style="{
        transform: `translateX(${translateX}px) translateX(${scrollBox3Offset}px)`,
      }"
    >
      <img alt="background" src="@/assets/2.png" draggable="false" />
    </div>

    <div
      class="box4"
      :style="{
        transform: `translateX(${-translateX}px) translateY(${scrollBox2Offset}px) translateX(${-scrollBox4Offset}px)`,
      }"
    >
      <img alt="background" src="@/assets/1.png" draggable="false" />
    </div>

    <div class="shadow">
      <div
        class="content"
        :style="{
          transform: `translateY(${translateY}px) translateY(${contentOffset}px)`,
          opacity: linkOpacity,
        }"
      >
        <div class="heading">
          <a>Kompleksowe Wykończenia Wnętrz</a>
        </div>
        <div class="button-more">
          <button @click="scrollToSection1">
            <p>Dowiedz się więcej</p>
            <span class="material-symbols-outlined"> arrow_downward </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { onMounted, onUnmounted, reactive } from "vue";

export default {
  data() {
    return {
      translateY: 400,
      translateX: 400,
    };
  },
  mounted() {
    setTimeout(() => {
      this.translateY = 0;
    }, 100);
    setTimeout(() => {
      this.translateX = 0;
    }, 100);
  },
  methods: {
    scrollToSection1() {
      document
        .getElementById("new-section-1")
        .scrollIntoView({ behavior: "smooth" });
    },
  },
  setup() {
    const state = reactive({
      scrollBox1Offset: 0,
      scrollBox2Offset: 0,
      scrollBox3Offset: 0,
      scrollBox4Offset: 0,
      contentOffset: 0,
      linkOpacity: 1,
      lastScrollY: 0,
    });

    const handleScroll = () => {
      const scrollDirection =
        window.scrollY > state.lastScrollY ? "down" : "up";
      const fadingSpeed = 0.03;

      state.scrollBox1Offset = window.scrollY * 0.3;
      state.scrollBox2Offset = window.scrollY * 0.3;
      state.scrollBox3Offset = window.scrollY * 0.3;
      state.scrollBox4Offset = window.scrollY * 0.3;
      state.contentOffset = window.scrollY * 0.6;

      if (scrollDirection === "down" && state.linkOpacity > 0) {
        state.linkOpacity -= fadingSpeed;
        document.querySelector(".content").style.animation = "none";
      } else if (scrollDirection === "up" && state.linkOpacity < 1) {
        state.linkOpacity += fadingSpeed;
        document.querySelector(".button-more").style.animation =
          "bounceUpDown 1.5s infinite";
      }

      state.lastScrollY = window.scrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return state;
  },
};
</script>

<style lang="scss">
header {
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px #3b3b3b9e;
  .box1,
  .box2,
  .box3,
  .box4 {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    left: 0;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .box2 {
    transition: transform 1.2s ease;
  }
  .box3 {
    transition: transform 1s ease;
  }
  .box4 {
    transition: transform 1s ease;
  }
}
.shadow {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  background: linear-gradient(#0000006a, #171717e2);
  .content {
    height: 100vh;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 1.2s ease, opacity 0.5s;

    .heading {
      height: auto;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        text-align: center;
        color: #e5e5e5;
        text-transform: uppercase;
        font-size: 3.5rem;
        font-weight: 700;
        font-family: "Ubuntu", sans-serif;
        border-bottom: 1px solid #e5e5e5;
      }
    }
    .button-more {
      height: auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button {
        border: none;
        outline: none;
        background-color: transparent;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        animation: bounceUpDown 1.5s infinite;
        p {
          color: #e5e5e5;
          font-family: "Ubuntu", sans-serif;
          font-size: 1.3rem;
        }
        span {
          color: #e5e5e5;
        }
      }
    }
  }
}
</style>
