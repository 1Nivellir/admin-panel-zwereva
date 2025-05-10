import type { Ref } from 'vue'
import { clone } from 'ramda'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { useToast } from 'primevue/usetoast'
export const useRemoveItem = <T extends { id: number }>(list: Ref<T[]>, url: string) => {
	const toast = useToast()
	const removeItem = async (id: number) => {
  if (id < 0) {
    list.value = list.value.filter((item: T) => item.id !== id)
    list.value = clone(list.value)
    return
  }
  try {
    const response = await useCustomFetch(url + '/' + id, {
      method: 'DELETE',
    })
    if (response.data) {
      list.value = list.value.filter((item: T) => item.id !== id)
      list.value = clone(list.value)
			toast.add({
				severity: 'success',
				summary: 'Успешно',
				detail: response.data,
				life: 3000,
			})
    }
  } catch (error) {
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: error,
			life: 3000,
		})
  }
}
  
  return {
    removeItem
  }
}
