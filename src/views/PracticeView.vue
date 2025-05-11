<script lang="ts" setup>
import { useGetDataOnView } from '@/composables/useGetData'
import { API_PRACTICE } from '@/utils/apiPath'
import { configFofTable, type IPractice } from '@/utils/configPractice'
import Table from '@/components/table/Table.vue'
import Button from 'primevue/button'
import { getUniqueId } from '@/utils/getUniqueId'
import { clone } from 'ramda'
import { useRemoveItem } from '@/composables/tableActions/useRemoveItem'
import { useUpdateData } from '@/composables/tableActions/useUpdateData'
import { useCheckResize } from '@/composables/useCheckResize'
import { columnsVisible } from '@/utils/configPractice'

const { isMobile } = useCheckResize()
const { list } = useGetDataOnView<IPractice>(API_PRACTICE + '/all')
const { removeItem } = useRemoveItem(list, API_PRACTICE)
const { updateData } = useUpdateData(list, API_PRACTICE)

const addNewRow = () => {
  list.value.unshift({
    id: getUniqueId(list.value),
    name: '',
    description: '',
    show: false,
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
      :applications="(list as IPractice[])"
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
