<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/header/Header.vue'
import { useRootStore } from '@/stores/root'
import Button from 'primevue/button'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_APPLYMAINPAGE } from '@/utils/apiPath'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'
const router = useRouter()
const toast = useToast()
const counterStore = useRootStore()

onMounted(() => {
  if (router.currentRoute.value.path === '/') {
    router.push('/applications')
  }
})
const fetchUpdateSite = async () => {
  try {
    const response = await useCustomFetch(API_APPLYMAINPAGE)
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: response.data,
      life: 3000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error,
      life: 7000,
    })
  }
}

const showToast = () => {
  toast.add({
    severity: 'error',
    summary: 'Информация',
    detail: 'Это тестовое сообщение',
  })
}
</script>

<template>
  <Header />
  <div class="visits-counter container">
    <Button label="Применить изменения" size="small" @click="fetchUpdateSite" />

    <Button label="Показать тост" size="small" @click="showToast" />
    <span class="visits-counter__value"
      >Посещений: {{ counterStore.visits }}</span
    >
  </div>
  <main>
    <div class="container">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style lang="scss">
.visits-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  &__value {
    font-size: 20px;
    font-weight: 500;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
