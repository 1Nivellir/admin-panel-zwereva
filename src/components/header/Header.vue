<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from 'primevue'
import NavMenu from '@/components/header/NavMenu.vue'
import MobileBurger from '@/components/header/MobileBurger.vue'
import { removeCookie } from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { pageNames } from '@/utils/const/nameHeader'
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
      <div v-if="!isMobile"></div>
      <MobileBurger v-if="isMobile" />
      <div class="header__title" v-if="isMobile">
        <span class="header__title-text">{{
          pageNames[$route.name as keyof typeof pageNames]
        }}</span>
      </div>
      <NavMenu v-else />
      <div class="header__right">
        <Button
          v-tooltip="'Выйти'"
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
  padding-top: 40px;

  @media (max-width: 992px) {
    padding-top: 20px;
  }
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 992px) {
    justify-content: space-between;
  }
}

.header__title {
  margin-right: 30%;
}
.header__mobile-burger {
  display: flex;
}

.header__logout {
  background: none;
  border: none;
  cursor: pointer;
}

.header__title-text {
  font-size: 20px;
  font-weight: 500;
}
</style>
