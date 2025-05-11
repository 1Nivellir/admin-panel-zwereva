<script lang="ts" setup>
import { ref } from 'vue'
import { menuNavigations } from '@/utils/menuItems'
import CustomLink from '@/components/common/CustomLink.vue'

const emit = defineEmits(['close'])
</script>

<template>
  <nav>
    <ul class="list-reset list" :class="$attrs.class">
      <li
        class="list-item"
        v-for="(item, index) in menuNavigations"
        :key="index"
      >
        <CustomLink :to="item.link" @click="emit('close')">
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

.mobile-burger__menu {
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
}
</style>
