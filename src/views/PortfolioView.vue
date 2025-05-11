<script lang="ts" setup>
import { API_PORTFOLIO } from '@/utils/apiPath'

import Table from '@/components/table/Table.vue'
import {
  configFofTable,
  type IPortfolio,
  columnsVisible,
} from '@/utils/configPortfolio'
import { useGetDataOnView } from '@/composables/useGetData'
import Button from 'primevue/button'
import { getUniqueId } from '@/utils/getUniqueId'
import { useRemoveItem } from '@/composables/tableActions/useRemoveItem'
import { useUpdateData } from '@/composables/tableActions/useUpdateData'
import { clone } from 'ramda'
import { useCheckResize } from '@/composables/useCheckResize'

const { isMobile } = useCheckResize()
const { list } = await useGetDataOnView<IPortfolio>(API_PORTFOLIO)
const { removeItem } = useRemoveItem(list, API_PORTFOLIO)
const { updateData } = useUpdateData(list, API_PORTFOLIO)

const addNewRow = () => {
  list.value.unshift({
    id: getUniqueId(list.value),
    name: '',
    description: '',
    show: false,
    imageId: '',
  })
  list.value = clone(list.value)
}
</script>

<template>
  <div class="portfolio-view">
    <Button label="Добавить" @click="addNewRow" size="small" />
  </div>
  <Table
    :column-visibility="!isMobile ? undefined : columnsVisible"
    :editable="!isMobile"
    @removeItem="removeItem"
    @updateData="updateData"
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
