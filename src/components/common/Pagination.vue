<script lang="ts" setup>
defineProps<{
  totalPages: number
  currentPage: number
}>()
const emit = defineEmits<{
  'update:currentPage': [number]
}>()
const handlePageChange = (page: number) => {
  emit('update:currentPage', page)
}
</script>

<template>
  <div class="pagination">
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button btn-reset"
    >
      <i class="pi pi-chevron-left"></i>
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="handlePageChange(page)"
      :disabled="currentPage === page"
      class="pagination-button btn-reset"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button btn-reset"
    >
      <i class="pi pi-chevron-right"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 5px;
}

.pagination-button {
  background-color: #f0f0f0;
  color: #7a7a7a;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.pagination-button:disabled:not(.active) {
  opacity: 0.5;
  cursor: not-allowed;
}

.active {
  background-color: #007bff;
  color: #fff;
}
</style>
