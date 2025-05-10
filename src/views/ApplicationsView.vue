<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_APPLICATIONS } from '@/utils/apiPath'
import Table from '@/components/table/Table.vue'
import { useGetDataOnView } from '@/composables/useGetData'
import { configFofTable, type Applications } from '@/utils/configApplications'
import Pagination from '@/components/common/Pagination.vue'
import { clone } from 'ramda'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const currentPage = ref(1)
const list = await useGetDataOnView(
  `${API_APPLICATIONS}/page/${currentPage.value}`
)

const removeItem = async (id: number) => {
  if (id < 0) {
    list.value = list.value.filter((item: Applications) => item.id !== id)
    list.value = clone(list.value)
    return
  }
  try {
    const response = await useCustomFetch(
      `${API_APPLICATIONS}/page/${currentPage.value}/${id}`,
      {
        method: 'DELETE',
      }
    )
    list.value = response.data
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Заявка удалена',
      life: 3000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error,
      life: 3000,
    })
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

const updateItem = async (item: Applications) => {
  try {
    const { id, createdAt, ...rest } = item
    const response = await useCustomFetch(
      `${API_APPLICATIONS}/page/${currentPage.value}/${id}`,
      {
        method: 'PUT',
        data: rest,
      }
    )
    list.value = response.data
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Заявка обновлена',
      life: 3000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error,
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="applications-view">
    <Table
      @update-data="updateItem"
      @remove-item="removeItem"
      :applications="(list.elements as Applications[]) || []"
      :columns-config="(configFofTable as any)"
    />
    <Pagination
      :total-pages="list.totalPages || 0"
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
