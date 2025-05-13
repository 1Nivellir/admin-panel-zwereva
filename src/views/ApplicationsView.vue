<script lang="ts" setup>
import Table from '@/components/table/Table.vue'
import {
  configFofTable,
  type Applications,
  columnVisibility,
} from '@/utils/configApplications'
import Pagination from '@/components/common/Pagination.vue'
import { useApplicationsView } from '@/composables/useApplicationsView'
import { useCheckResize } from '@/composables/useCheckResize'
const { isMobile } = useCheckResize()
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
    <div class="applications-view__table">
      <Table
        :column-visibility="!isMobile ? undefined : columnVisibility"
        :editable="!isMobile"
        @update-data="updateItem"
        @remove-item="removeItem"
        :applications="list"
        :columns-config="(configFofTable as any)"
      />
    </div>
    <div class="applications-view__pagination">
      <Pagination
        :total-pages="totalPages || 0"
        v-model:current-page="currentPage"
        @update:current-page="changePageForPagination"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.applications-view {
  display: flex;
  flex-direction: column;
  height: 75vh;

  &__table {
    flex-grow: 1;
    padding-bottom: 16px;
    overflow-y: auto;
  }
}
</style>
