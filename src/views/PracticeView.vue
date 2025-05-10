<script lang="ts" setup>
import { useGetDataOnView } from '@/composables/useGetData'
import { API_PRACTICE } from '@/utils/apiPath'
import { configFofTable, type IPractice } from '@/utils/configPractice'
import Table from '@/components/table/Table.vue'
import Button from 'primevue/button'
import { getUniqueId } from '@/utils/getUniqueId'
import { clone } from 'ramda'
import { useCustomFetch } from '@/composables/useCustomFetch'
const list = await useGetDataOnView(API_PRACTICE + '/all')

const addNewRow = () => {
  list.value.unshift({
    id: getUniqueId(list.value),
    name: '',
    description: '',
  })
  list.value = clone(list.value)
}

const removeItem = async (id: number) => {
  if (id < 0) {
    list.value = list.value.filter((item: IPractice) => item.id !== id)
    list.value = clone(list.value)
    return
  }
  try {
    const response = await useCustomFetch(API_PRACTICE + '/' + id, {
      method: 'DELETE',
    })
    if (response.data) {
      list.value = list.value.filter((item: IPractice) => item.id !== id)
      list.value = clone(list.value)
    }
  } catch (error) {
    console.log(error)
  }
}

const updateData = async (data: IPractice, index: number) => {
  const { id, ...rest } = data
  if (data.id < 0) {
    try {
      const response = await useCustomFetch(API_PRACTICE, {
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
      const { id, createdAt, ...rest } = data
      const response = await useCustomFetch(`${API_PRACTICE}/${id}`, {
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
</script>

<template>
  <div class="button-container">
    <Button @click="addNewRow" size="small" label="Добавить" />
  </div>
  <Table
    @remove-item="removeItem"
    @update-data="updateData"
    :applications="(list as IPractice[])"
    :columns-config="(configFofTable as any)"
  />
</template>

<style scoped lang="scss">
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
