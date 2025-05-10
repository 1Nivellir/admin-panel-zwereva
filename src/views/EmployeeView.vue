<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_EMPLOYEE } from '@/utils/apiPath'
import Table from '@/components/table/Table.vue'
import { configFofTable, type IEmployee } from '@/utils/configEmployee'
import { useGetDataOnView } from '@/composables/useGetData'
import Button from 'primevue/button'
import { getUniqueId } from '@/utils/getUniqueId'
import { clone } from 'ramda'
import { useToast } from 'primevue/usetoast'
const list = await useGetDataOnView(API_EMPLOYEE + '/all')
const toast = useToast()

const addNewRow = () => {
  list.value.unshift({
    id: getUniqueId(list.value),
    name: '',
    jobTitle: '',
    imageId: '',
    active: false,
    deleted: false,
  })
  list.value = clone(list.value)
}

const getDataForSsave = async (params: IEmployee, index: number) => {
  if (params.id < 0) {
    const { id, createdAt, ...rest } = params
    try {
      const response = await useCustomFetch(API_EMPLOYEE, {
        method: 'POST',
        data: rest,
      })
      list.value[index] = response.data
      list.value = clone(list.value)
    } catch (error) {
      console.log(error)
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error as string,
      })
    }
  } else {
    try {
      const { id, createdAt, ...rest } = params
      const response = await useCustomFetch(API_EMPLOYEE + '/' + id, {
        method: 'PUT',
        data: rest,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

const removeItem = async (id: number) => {
  if (id < 0) {
    list.value = list.value.filter((item: IEmployee) => item.id !== id)
    list.value = clone(list.value)
    return
  }
  try {
    const response = await useCustomFetch(API_EMPLOYEE + '/' + id, {
      method: 'DELETE',
    })
    if (response.data) {
      list.value = list.value.filter((item: IEmployee) => item.id !== id)
      list.value = clone(list.value)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="button-container">
    <Button @click="addNewRow" size="small" label="Добавить" />
  </div>
  <Table
    @remove-item="removeItem"
    @update-data="getDataForSsave"
    :applications="(list as IEmployee[])"
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
