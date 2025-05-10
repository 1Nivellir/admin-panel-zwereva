import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_VISITS } from '@/utils/apiPath'

export const useRootStore = defineStore('counter', () => {
  const visits = ref(0)

  const fetchVisits = async () => {
    try {
      const response = await useCustomFetch(API_VISITS)
      visits.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return {  fetchVisits, visits }
})
