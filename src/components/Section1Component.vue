<template>
  <section id="section1">
    <div class="back1">
      <img alt="section1-img" :src="sec1_img1" draggable="false" />
    </div>
    <div class="back2">
      <img
        alt="section1-img"
        :src="sec1_img2"
        draggable="false"
        :style="{ transform: parallaxTransform }"
      />
    </div>
    <div class="content-box">
      <div class="heading">
        <a>Kompleksowe usługi wykończeniowo-budowlane</a>
        <a style="font-weight: 700">8 lat doświadczenia na rynku</a>
        <a>Od projektu do realizacji jedna umowa, jeden wykonawca</a>
      </div>
      <div class="content">
        <p>
          Zespół AR Team realizuje prace związane z wykończeniem wnętrz,
          remontami oraz usługami budowlanymi.<br /><br />
          Każdy projekt wykonujemy z najwyższą starannością i dbałością o
          detale.<br /><br />
          Nasze doświadczenie budowane przez wiele lat pracy w Polsce i Ukrainie
          oraz staranny dobór niezawodnych materiałów gwarantują rezultaty na
          najwyższym poziomie.
        </p>
      </div>
      <!-- <div class="offer-box-main">
        <div class="offer-box">
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>
              Tynkowanie, szpachlowanie,<br />
              malowanie
            </h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Hydraulika, elektryka</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Kabiny prysznicowe</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Baterie podtynkowe</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Zabudowy GK</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Glazura, terakota</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Układanie parkietu</h1>
          </div>
        </div>
        <div class="offer-box">
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Montaż listw przypodłogowych oraz sufitowych</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Montaż drzwi zewnętrznych oraz wewnętrznych</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Baterie podtynkowe</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Montaż sufitów podwieszanych oraz naciąganych</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Oświetlenie</h1>
          </div>
          <div class="offer">
            <span
              class="material-symbols-outlined"
              style="font-size: 15px; padding-right: 1rem"
            >
              done_outline
            </span>
            <h1>Meble na wymiar</h1>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default {
  setup() {
    const sec1_img1 = ref("");
    const sec1_img2 = ref("");
    const parallaxTransform = ref("translateY(0%)");
    // const contentBoxParallaxTransform = ref("translateY(0%)");

    onMounted(() => {
      fetchImage();
      window.addEventListener("scroll", updateParallax);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", updateParallax);
    });
    function updateParallax() {
      // Adjust the multiplier based on the desired parallax effect
      const parallaxMultiplier = 0.5;
      const scrollPosition = window.scrollY;
      // const contentBoxParallaxMultiplier = 0.5;

      parallaxTransform.value = `translateY(${
        -scrollPosition * parallaxMultiplier
      }px)`;
      // contentBoxParallaxTransform.value = `translateY(${
      //   scrollPosition * contentBoxParallaxMultiplier
      // }px)`;
    }
    async function fetchImage() {
      try {
        const storage = getStorage();
        const imageRef1 = storageRef(storage, "arteam-pictures/6.webp");
        const imageRef2 = storageRef(storage, "arteam-pictures/7.webp");
        const url1 = await getDownloadURL(imageRef1);
        const url2 = await getDownloadURL(imageRef2);

        sec1_img1.value = url1;
        sec1_img2.value = url2;

        // console.log("Pomyslnie pobrano zdjecia", url1);
      } catch (error) {
        // console.error(error.message);
      }
    }
    return {
      sec1_img1,
      sec1_img2,
      parallaxTransform,
      // contentBoxParallaxTransform,
    };
  },
};
</script>

<style lang="scss">
#section1 {
  position: relative;
  height: auto;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0px -20px 25px black;
  .back1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      height: 100%;
      width: 30%;
    }
  }
  .back2 {
    position: absolute;
    width: auto;
    top: 125%;
    right: 7%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      height: 100%;
      border: 2px solid #000000;
      box-shadow: 0px 0px 25px #000000;
    }
  }
  .content-box {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 5%;
    gap: 2rem;
    .heading {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: auto;
      a {
        font-size: 1.8rem;
        color: #e5e5e5;
        font-family: "Ubuntu", sans-serif;
      }
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: auto;

      p {
        color: #e5e5e5;
        font-family: "Montserrat", sans-serif;
        font-size: 1.2rem;
      }
    }
    .offer-box-main {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      height: auto;
      width: 100%;
      .offer-box {
        height: 100%;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .offer {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          span {
            color: #e5e5e5;
          }
          h1 {
            font-size: 1rem;
            font-family: "Montserrat", sans-serif;
            color: #e5e5e5;
            font-weight: 100;
          }
        }
      }
    }
  }
}
</style>
