<script lang="ts" setup>
import { API_EMPLOYEE } from '@/utils/apiPath'
import Table from '@/components/table/Table.vue'
import {
  configFofTable,
  type IEmployee,
  columnsVisible,
} from '@/utils/configEmployee'
import { useGetDataOnView } from '@/composables/useGetData'
import Button from 'primevue/button'
import { getUniqueId } from '@/utils/getUniqueId'
import { clone } from 'ramda'
import { useRemoveItem } from '@/composables/tableActions/useRemoveItem'
import { useUpdateData } from '@/composables/tableActions/useUpdateData'

import { useCheckResize } from '@/composables/useCheckResize'
const { isMobile } = useCheckResize()
const { list } = useGetDataOnView<IEmployee>(API_EMPLOYEE + '/all')
const { removeItem } = useRemoveItem(list, API_EMPLOYEE)
const { updateData } = useUpdateData(list, API_EMPLOYEE)

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
</script>

<template>
  <div>
    <div class="button-container">
      <Button @click="addNewRow" size="small" label="Добавить" />
    </div>
    <Table
      :column-visibility="!isMobile ? undefined : columnsVisible"
      :editable="!isMobile"
      @remove-item="removeItem"
      @update-data="updateData"
      :applications="list"
      :columns-config="(configFofTable as any)"
    />
  </div>
</template>

<style scoped lang="scss">
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
