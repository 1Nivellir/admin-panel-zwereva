<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { Button } from 'primevue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import Header from '@/components/header/Header.vue'
const disabled = ref(true)
</script>

<template>
  <Header />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
