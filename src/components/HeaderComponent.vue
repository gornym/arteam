<template>
  <header
    :style="{ backgroundImage: `url('${headerSrcBg}')` }"
    class="animated"
    @animationend="headerAnimationEnd"
    id="header"
  >
    <div class="content">
      <div class="heading" :class="{ hovered: isHovered }">
        <p>Kompleksowe Wykończenia Wnętrz</p>
      </div>
      <div class="button" :class="{ hovered: isHovered }">
        <button @click="scrollToSection1">
          <p>Dowiedz się więcej</p>
          <span class="material-symbols-outlined"> arrow_downward </span>
        </button>
      </div>
      <div class="info" :class="{ hovered: isHovered }">
        <div class="info-telephone">
          <span class="material-symbols-outlined"> phone_in_talk </span>
          <p>+48 510 451 111</p>
        </div>
        <div class="info-telephone">
          <span class="material-symbols-outlined"> phone_in_talk </span>
          <p>+48 731 391 033</p>
        </div>
        <div class="info-mail">
          <span class="material-symbols-outlined"> mail </span>
          <p>luxibud@wp.pl</p>
        </div>
        <div class="info-location">
          <span class="material-symbols-outlined"> location_on </span>
          <p>Warszawa</p>
        </div>
        <div class="info-address">
          <span class="material-symbols-outlined"> home </span>
          <p>05-077, Diamentowa 1/13</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
header {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  border-image: fill 0 linear-gradient(rgba(0, 0, 0, 0.456), #000000fd);
  filter: blur(10px);
  animation: fadeIn 2s ease-out forwards;
  box-shadow: 0px 20px 25px black;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heading {
  height: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 1px solid transparent;
  p {
    font-size: 3.5rem;
    color: transparent;
    transition: color 1.5s ease;
    font-family: "Ubuntu", sans-serif;
    text-transform: uppercase;
    margin: 0;
    padding-bottom: 10px;
    text-align: center;
  }

  &.hovered {
    border-bottom-color: #e5e5e5;

    p {
      color: #e5e5e5;
    }
  }
}

.button {
  height: 10%;
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
      color: transparent;
      transition: color 1.5s ease;
      font-family: "Ubuntu", sans-serif;
      font-size: 1.1rem;
    }

    span {
      color: transparent;
      transition: color 1.5s ease;
    }
  }

  &.hovered {
    button {
      p {
        color: #e5e5e5;
      }
      span {
        color: #e5e5e5;
      }
    }
  }
}

.info {
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .info-telephone,
  .info-mail,
  .info-location,
  .info-address {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 1.7rem;

    span {
      color: transparent;
      transition: color 1.5s ease;
    }

    p {
      color: transparent;
      transition: color 1.5s ease;
      margin-left: 1rem;
      font-size: 1rem;
      font-family: "Ubuntu", sans-serif;
    }
  }

  &.hovered {
    .info-telephone,
    .info-mail,
    .info-location,
    .info-address {
      p,
      span {
        color: #e5e5e5;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    filter: blur(10px);
  }
  to {
    filter: blur(0);
  }
}

@keyframes bounceUpDown {
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
</style>

<script>
import { ref, onMounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default {
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    headerAnimationEnd() {
      this.isHovered = true;
    },
    scrollToSection1() {
      document
        .getElementById("section1")
        .scrollIntoView({ behavior: "smooth" });
    },
  },
  setup() {
    const headerSrcBg = ref("");

    onMounted(() => {
      fetchImage();
    });

    async function fetchImage() {
      try {
        const storage = getStorage();
        const imageRef = storageRef(storage, "arteam-pictures/2.webp");
        const url = await getDownloadURL(imageRef);

        headerSrcBg.value = url;

        console.log("Pomyślnie pobrano URL zdjęcia:", url);
      } catch (error) {
        console.error("Błąd podczas pobierania URL zdjęcia:", error.message);
      }
    }

    return {
      headerSrcBg,
    };
  },
};
</script>
