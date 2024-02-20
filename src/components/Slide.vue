<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="slide">
    <transition name="slide">
      <slot />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.slide {
  height: 90%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
