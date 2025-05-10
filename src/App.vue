<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCustomFetch } from './composables/useCustomFetch'
import { onMounted } from 'vue'
import { API_PORTFOLIO } from './utils/apiPath'
import { useRouter } from 'vue-router'

import Toast from 'primevue/toast'
const router = useRouter()

// onMounted(() => {
//   router.push('/applications')
// })
</script>

<template>
  <Toast />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
