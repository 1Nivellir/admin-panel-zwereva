<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCustomFetch } from './composables/useCustomFetch'
import { onMounted } from 'vue'
import { API_PORTFOLIO } from './utils/apiPath'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/applications')
})
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
