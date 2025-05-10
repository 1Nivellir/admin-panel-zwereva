<script lang="ts" setup>
import { API_PORTFOLIO } from '@/utils/apiPath'

import Table from '@/components/table/Table.vue'
import { configFofTable, type IPortfolio } from '@/utils/configPortfolio'
import { useGetDataOnView } from '@/composables/useGetData'
import Button from 'primevue/button'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { useToast } from 'primevue/usetoast'
import { getUniqueId } from '@/utils/getUniqueId'
import Toast from 'primevue/toast'

const list = await useGetDataOnView(API_PORTFOLIO)

const addNewRow = () => {
  list.value.unshift({
    id: getUniqueId(list.value),
    name: '',
    description: '',
    show: false,
    imageId: '',
  })
  list.value = [...list.value]
}

const updateRow = async (row: IPortfolio, index: number) => {
  const { id, ...rest } = row
  if (row.id < 0) {
    try {
      const response = await useCustomFetch(API_PORTFOLIO, {
        method: 'POST',
        data: rest,
      })
      list.value[index] = response.data
      list.value = [...list.value]
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const { id, createdAt, ...rest } = row
      const response = await useCustomFetch(`${API_PORTFOLIO}/${id}`, {
        method: 'PUT',
        data: rest,
      })
      list.value[index] = response.data
      list.value = [...list.value]
    } catch (error) {
      console.log(error)
    }
  }
}
const removeItem = async (id: number, index: number) => {
  try {
    const response = await useCustomFetch(`${API_PORTFOLIO}/${id}`, {
      method: 'DELETE',
    })
    if (response) {
      list.value = list.value.filter((item: IPortfolio) => item.id !== id)
      list.value = [...list.value]
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Toast />
  <div class="portfolio-view">
    <Button label="Добавить" @click="addNewRow" />
  </div>
  <Table
    @removeItem="removeItem"
    @updateData="updateRow"
    :applications="(list as IPortfolio[])"
    :columns-config="(configFofTable as any)"
  />
</template>

<style scoped lang="scss">
.portfolio-view {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
