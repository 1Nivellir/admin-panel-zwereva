<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCustomFetch } from './composables/useCustomFetch'
import { onMounted } from 'vue'
import { API_PORTFOLIO } from './utils/apiPath'
import { useRouter } from 'vue-router'
import { useRootStore } from './stores/root'
import Toast from 'primevue/toast'
const router = useRouter()
const counterStore = useRootStore()

onMounted(async () => {
  await counterStore.fetchVisits()
  // router.push('/auth')
})
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style scoped></style>
