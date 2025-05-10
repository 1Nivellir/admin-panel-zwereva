<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_APPLICATIONS } from '@/utils/apiPath'
import Table from '@/components/table/Table.vue'
import { useGetDataOnView } from '@/composables/useGetData'
import { configFofTable, type Applications } from '@/utils/configApplications'
import Pagination from '@/components/common/Pagination.vue'

const currentPage = ref(1)
const list = await useGetDataOnView(
  `${API_APPLICATIONS}/page/${currentPage.value}`
)

const removeItem = async (id: number) => {
  try {
    const response = await useCustomFetch(
      `${API_APPLICATIONS}/page/${1}/${id}`,
      {
        method: 'DELETE',
      }
    )
    list.value = response
  } catch (error) {
    console.log(error)
  }
}

const updateCurrentPage = async (page: number) => {
  currentPage.value = page
  try {
    const response = await useCustomFetch(`${API_APPLICATIONS}/page/${page}`)
    list.value = response.data
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="applications-view">
    <Table
      @remove-item="removeItem"
      :applications="(list.elements as Applications[]) || []"
      :columns-config="(configFofTable as any)"
    />
    <Pagination
      :total-pages="list.totalPages"
      :current-page="currentPage"
      @update:current-page="updateCurrentPage"
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
