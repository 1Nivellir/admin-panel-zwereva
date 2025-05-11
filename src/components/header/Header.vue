<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from 'primevue'
import NavMenu from '@/components/header/NavMenu.vue'
import MobileBurger from '@/components/header/MobileBurger.vue'
import { removeCookie } from '@/utils/cookies'
import { useRouter } from 'vue-router'
const isMobile = ref(false)
const router = useRouter()

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

const logout = () => {
  removeCookie('token')
  router.push('/auth')
}
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div></div>
      <MobileBurger v-if="isMobile" />

      <NavMenu v-else />
      <div class="header__right">
        <Button
          @click="logout"
          icon="pi pi-sign-out"
          size="small"
          severity="secondary"
        />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 20px 0;
}

.header-left {
  width: 20px;
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 992px) {
    justify-content: flex-start;
  }
}
.header__mobile-burger {
  display: flex;
}

.header__right {
}

.header__logout {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
