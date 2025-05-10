<script lang="ts" setup>
import { ref } from 'vue'
const title = ref('My Component')

import NavMenu from '@/components/header/navigation/NavMenu.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      <NavMenu />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 20px 0;
}
</style>
