import { ref, onMounted } from "vue";

import { useCustomFetch } from '@/composables/useCustomFetch'
export const useGetDataOnView = <T>(path: string, keyOrder: (keyof T)[]) => {
	const list = ref<T[]>([])
	const sortHowInterface = <T>(listForSort: T[], keyOrder: (keyof T)[]) => {
		return listForSort.map(item => {
			const reorderef: Partial<T> ={}
			for (const key of keyOrder) {
				reorderef[key as keyof T] = item[key as keyof T]
			}
			return reorderef
		})
	}
	onMounted(async () => {
		try {
			const response = await useCustomFetch(path)
			list.value = sortHowInterface(response.data, keyOrder) as T[]
		} catch (error) {
			console.error(error)
		}
	})

	return {list}
}