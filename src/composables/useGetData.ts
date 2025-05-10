import { ref, onMounted } from "vue";

import { useCustomFetch } from '@/composables/useCustomFetch'
export const useGetDataOnView = async (path: string) => {

	const list = ref<any>([])
	onMounted(async () => {
		try {
			const response = await useCustomFetch(path)
			list.value = response.data
		} catch (error) {
			console.error(error)
		}
	})

	return list
}