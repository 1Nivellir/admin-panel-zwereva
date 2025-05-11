<script lang="ts" setup>
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_COMPANY, API_LINKS } from '@/utils/apiPath'
import FormAbout from '@/components/about/FormAbout.vue'
import type { ICompany } from '@/types/app'
import { clone } from 'ramda'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const data = ref<ICompany>({
  name: '',
  description: '',
  contacts: {
    address: '',
    mobilePhone: '',
    links: {
      TELEGRAM: [],
    },
  },
})

onMounted(async () => {
  try {
    const [responseLinks, responseCompany] = await Promise.all([
      useCustomFetch(API_LINKS),
      useCustomFetch(API_COMPANY),
    ])
    data.value = responseCompany.data
    console.log(responseLinks)
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось загрузить данные',
      life: 7000,
    })
  }
})

const getData = computed(() => {
  return data.value
})

const save = async (formData: ICompany) => {
  try {
    const response = await useCustomFetch(API_COMPANY, {
      method: 'PUT',
      data: formData,
    })
    data.value = clone(response.data)
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Данные успешно обновлены',
      life: 3000,
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: err,
      life: 7000,
    })
  }
}
</script>

<template>
  <FormAbout :data="getData" @save="save" />
</template>

<style scoped lang="scss">
/* Your component styles here */
</style>
