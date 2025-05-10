<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_EMPLOYEE } from '@/utils/apiPath'
import Table from '@/components/table/Table.vue'
import { configFofTable, type IEmployee } from '@/utils/configEmployee'
import { useGetDataOnView } from '@/composables/useGetData'

const list = await useGetDataOnView(API_EMPLOYEE + '/all')

const getDataForSsave = (params: any) => {
  console.log(params)
}
</script>

<template>
  <Table
    @update-data="getDataForSsave"
    :applications="(list as IEmployee[])"
    :columns-config="(configFofTable as any)"
  />
</template>

<style scoped lang="scss">
/* Your component styles here */
</style>
