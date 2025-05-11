<script lang="ts" setup>
import Table from '@/components/table/Table.vue'
import { configFofTable, type Applications } from '@/utils/configApplications'
import Pagination from '@/components/common/Pagination.vue'
import { useApplicationsView } from '@/composables/useApplicationsView'

const {
  list,
  currentPage,
  totalPages,
  changePageForPagination,
  removeItem,
  updateItem,
} = useApplicationsView()
</script>

<template>
  <div class="applications-view">
    <Table
      @update-data="updateItem"
      @remove-item="removeItem"
      :applications="list"
      :columns-config="(configFofTable as any)"
    />
    <Pagination
      :total-pages="totalPages || 0"
      v-model:current-page="currentPage"
      @update:current-page="changePageForPagination"
    />
  </div>
</template>

<style scoped lang="scss">
.applications-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
