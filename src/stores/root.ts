import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_VISITS } from '@/utils/apiPath'
import { useRouter, useRoute } from 'vue-router'
export const useRootStore = defineStore('counter', () => {
  const visits = ref(0)
  const router = useRouter()
  const route = useRoute()
  const fetchVisits = async () => {
    try {
      const response = await useCustomFetch(API_VISITS)
      if (response.data) {
        router.push(route.path)
      }
      visits.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return {  fetchVisits, visits }
})
