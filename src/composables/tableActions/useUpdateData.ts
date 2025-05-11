import type { Ref } from 'vue'
import { clone } from 'ramda'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { useToast } from 'primevue/usetoast'
export const useUpdateData = <T extends { id: number, createdAt?: Date | string }>(list: Ref<T[]>, url: string) => {
	const toast = useToast()
	const updateData = async (params: T, index: number) => {
		if (params.id < 0) {
			const { id, createdAt, ...rest } = params
			try {
				const response = await useCustomFetch(url, {
					method: 'POST',
					data: rest,
				})
				list.value[index] = response.data
				list.value = clone(list.value)
			} catch (error) {
				console.log(error)
				toast.add({
					severity: 'error',
					summary: 'Ошибка',
					detail: error as string,
				})
			}
		} else {
			try {
				const { id, createdAt, ...rest } = params
				const response = await useCustomFetch(url + '/' + id, {
					method: 'PUT',
					data: rest,
				})
				list.value[index] = response.data
				list.value = clone(list.value)
				console.log(list.value)
			} catch (error) {
				console.log(error)
			}
		}
	}

return {
	updateData
}
}