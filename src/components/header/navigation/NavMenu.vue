<script lang="ts" setup>
import { ref } from 'vue'
import { menuNavigations } from '@/utils/menuItems'
import CustomLink from '@/components/common/CustomLink.vue'
const title = ref('My Component')
</script>

<template>
  <nav>
    <ul class="list-reset list">
      <li
        class="list-item"
        v-for="(item, index) in menuNavigations"
        :key="index"
      >
        <CustomLink :to="item.link">
          {{ item.title }}
        </CustomLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.list {
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
