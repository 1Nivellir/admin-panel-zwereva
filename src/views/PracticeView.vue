<script lang="ts" setup>
import { useGetDataOnView } from '@/composables/useGetData'
import { API_PRACTICE } from '@/utils/apiPath'
import { configFofTable, type IPractice } from '@/utils/configPractice'
import Table from '@/components/table/Table.vue'

const list = await useGetDataOnView(API_PRACTICE + '/all')
</script>

<template>
  <Table
    :applications="(list as IPractice[])"
    :columns-config="(configFofTable as any)"
  />
</template>

<style scoped lang="scss">
/* Your component styles here */
</style>
