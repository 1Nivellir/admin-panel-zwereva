<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/Header.vue'
import { useRootStore } from '@/stores/root'
import Button from 'primevue/button'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_APPLYMAINPAGE } from '@/utils/apiPath'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const counterStore = useRootStore()

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
      life: 3000,
    })
  }
}
</script>

<template>
  <Header />
  <div class="visits-counter container">
    <Button label="Применить изменения" size="small" @click="fetchUpdateSite" />
    <span class="visits-counter__value"
      >Посещений: {{ counterStore.visits }}</span
    >
  </div>
  <main>
    <div class="container">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </main>
</template>

<style scoped lang="scss">
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
</style>
