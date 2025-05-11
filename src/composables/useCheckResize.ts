import { ref, onMounted, onUnmounted } from 'vue'

export const useCheckResize = () => {
  const isMobile = ref(false)

	const checkResize = () => {
		isMobile.value = window.innerWidth < 992
	}
	checkResize()
  onMounted(() => {
    window.addEventListener('resize', checkResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', checkResize)
  })

  return { isMobile }
}
