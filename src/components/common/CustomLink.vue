<script lang="ts" setup>
import { ref } from 'vue'
const title = ref('My Component')
import { RouterLink } from 'vue-router'
defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink active-class="active_link" :to="to" class="link">
    <slot></slot>
  </RouterLink>
</template>

<style scoped lang="scss">
.link {
  display: block;
  max-width: max-content;
  text-decoration: none;
  background: #eae9e9;
  border-radius: 7px;
  color: #000;
  padding: 10px 30px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover:not(.active_link) {
    background: #2b78f4;
    color: #fff;
  }
}

.active_link {
  background: #2b78f4;
  color: #fff;
}
</style>
