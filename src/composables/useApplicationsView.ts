import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Applications } from '@/utils/configApplications'
import { keyOrder } from '@/utils/configApplications'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_APPLICATIONS } from '@/utils/apiPath'
import { useToast } from 'primevue/usetoast'

export const useApplicationsView = () => {
  const list = ref<Applications[]>([])
	const toast = useToast()
  const currentPage = ref(1)
  const totalPages = ref(1)

	onMounted(async () => {
		await fetchApplications()
	})

	const sortHowInterface = <T>(listForSort: T[], keyOrder: (keyof Applications)[]) => {
		return listForSort.map(item => {
			const reorderef: Partial<T> ={}
			for (const key of keyOrder) {
				reorderef[key as keyof T] = item[key as keyof T]
			}
			return reorderef
		})
	}
  const fetchApplications = async () => {
		try {
			const response = await useCustomFetch(
				`${API_APPLICATIONS}/page/${currentPage.value}`
			)
			list.value = sortHowInterface(response.data.elements, keyOrder) as Applications[]
			currentPage.value = response.data.currentPage
			totalPages.value = response.data.totalPages
		} catch (error) {
			console.error(error)
		}
  }

	const changePageForPagination = async (page: number) => {
		try {
			const response = await useCustomFetch(`${API_APPLICATIONS}/page/${page}`)
			list.value = response.data.elements
			currentPage.value = response.data.currentPage
			totalPages.value = response.data.totalPages
		} catch (error) {
			console.log(error)
		}
	}

	const removeItem = async (id: number) => {
		try {
			const response = await useCustomFetch(
				`${API_APPLICATIONS}/page/${currentPage.value}/${id}`,
				{
					method: 'DELETE',
				}
			)
			list.value = response.data.elements
			currentPage.value = response.data.currentPage
			totalPages.value = response.data.totalPages
			toast.add({
				severity: 'success',
				summary: 'Успешно',
				detail: 'Заявка удалена',
				life: 3000,
			})
		} catch (error) {
			toast.add({
				severity: 'error',
				summary: 'Ошибка',
				detail: error,
				life: 3000,
			})
		}
	}
	
	const updateItem = async (item: Applications) => {
		try {
			const { id, createdAt, ...rest } = item
			const response = await useCustomFetch(
				`${API_APPLICATIONS}/page/${currentPage.value}/${id}`,
				{
					method: 'PUT',
					data: rest,
				}
			)
			list.value = response.data.elements
			currentPage.value = response.data.currentPage
			totalPages.value = response.data.totalPages
			toast.add({
				severity: 'success',
				summary: 'Успешно',
				detail: 'Заявка обновлена',
				life: 3000,
			})
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
		changePageForPagination,
		removeItem,
		updateItem,
    list,
		currentPage,
		totalPages
  }
}
