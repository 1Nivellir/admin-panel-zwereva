<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_COMPANY, API_LINKS } from '@/utils/apiPath'
import FormAbout from '@/components/about/FormAbout.vue'
import type { ICompany, ISocial, ILinks } from '@/types/app'
import { clone } from 'ramda'
import { useToast } from 'primevue/usetoast'
const toast = useToast(),
  data = ref<ICompany>({
    name: '',
    description: '',
    contacts: {
      address: '',
      mobilePhone: '',
      links: {
        TELEGRAM: [],
        WHATSAPP: [],
      },
    },
  }),
  socialData = ref<ILinks>({} as ILinks)

onMounted(async () => {
  try {
    const [responseLinks, responseCompany] = await Promise.all([
      useCustomFetch(API_LINKS),
      useCustomFetch(API_COMPANY),
    ])
    if (responseCompany.data.contacts.links) {
      delete responseCompany.data.contacts.links
    }
    data.value = responseCompany.data
    socialData.value = responseLinks.data
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: err,
      life: 7000,
    })
  }
})

const getSocialData = computed(() => {
  return socialData.value
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

const saveSocialLinks = async (
  formData: string,
  key: 'TELEGRAM' | 'WHATSAPP'
) => {
  try {
    const response = await useCustomFetch(API_LINKS, {
      method: 'POST',
      data: {
        type: key,
        link: formData,
        name: ' ',
      },
    })
    socialData.value = response.data
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Ссылка успешно добавлена',
      life: 3000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error,
      life: 7000,
    })
  }
}

const removeSocialLinks = async (
  formData: string,
  key: 'TELEGRAM' | 'WHATSAPP'
) => {
  try {
    const response = await useCustomFetch(API_LINKS, {
      method: 'DELETE',
      data: { link: formData, type: key },
    })
    socialData.value = response.data
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Ссылка успешно удалена',
      life: 3000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error,
      life: 7000,
    })
  }
}
</script>

<template>
  <div>
    <FormAbout
      :socialData="getSocialData"
      :data="getData"
      @save="save"
      @saveSocial="saveSocialLinks"
      @removeSocial="removeSocialLinks"
    />
  </div>
</template>

<style scoped lang="scss">
/* Your component styles here */
</style>
