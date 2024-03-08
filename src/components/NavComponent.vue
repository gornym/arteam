<template>
  <nav>
    <div class="left-nav" style="padding-left: 2rem">
      <a @click="scrollToSection1"> O NAS</a>
      <a @click="scrollToSection2">REALIZACJE</a>
    </div>
    <div class="middle-nav">
      <img
        alt="logo"
        src="@/assets/1.webp"
        draggable="false"
        @click="scrollToHeader"
      />
    </div>
    <div class="right-nav">
      <a @click="scrollToSection3"> USŁUGI</a>
      <a @click="scrollToSection4">KONTAKT</a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    scrollToSection1() {
      document
        .getElementById("new-section-1")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToSection2() {
      document
        .getElementById("section2")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToSection3() {
      document
        .getElementById("section3")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToSection4() {
      document
        .getElementById("section4")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToHeader() {
      document.getElementById("header").scrollIntoView({ behavior: "smooth" });
    },
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
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4rem;
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
  .right-nav {
    justify-content: flex-end;
    padding-right: 2rem;
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
      cursor: pointer;
    }
  }
}
</style>
