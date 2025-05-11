<template>
  <div>
    <Transition name="mobile-burger" mode="out-in">
      <div class="mobile-burger" v-if="isOpen">
        <button
          class="mobile-burger__button btn-reset"
          @click="isOpen = !isOpen"
        >
          <i class="pi pi-times"></i>
        </button>
        <NavMenu class="mobile-burger__menu" @close="isOpen = false" />
      </div>
    </Transition>
    <div class="button_container">
      <button class="mobile-burger__button btn-reset" @click="isOpen = !isOpen">
        <i class="pi pi-bars"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/header/NavMenu.vue'
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped lang="scss">
.mobile-burger {
  padding: 20px;
  padding-right: 40px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(224, 224, 224);
  z-index: 1000;
}

.mobile-burger__button {
  position: absolute;
  top: 10px;
  right: 10px;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
}

.mobile-burger-enter-active,
.mobile-burger-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-burger-enter-from,
.mobile-burger-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
