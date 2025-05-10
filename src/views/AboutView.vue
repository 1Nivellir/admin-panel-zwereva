<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_COMPANY } from '@/utils/apiPath'

const { myfetch } = useCustomFetch()

onMounted(async () => {
  try {
    const response = await myfetch(API_COMPANY)
    console.log(response)
  } catch (error) {
    console.error(error)
    throw new Error(error as string)
  }
})
</script>

<template>about</template>

<style scoped lang="scss">
/* Your component styles here */
</style>
