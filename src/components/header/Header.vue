<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const title = ref('My Component')

import NavMenu from '@/components/header/NavMenu.vue'
import MobileBurger from '@/components/header/MobileBurger.vue'

const isMobile = ref(false)

const checkResize = () => {
  isMobile.value = window.innerWidth < 992
}

onMounted(() => {
  window.addEventListener('resize', checkResize)
  checkResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkResize)
})
</script>

<template>
  <header class="header">
    <div class="container">
      <MobileBurger v-if="isMobile" />
      <NavMenu v-else />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 20px 0;
}

.header__mobile-burger {
  display: flex;
}
</style>
