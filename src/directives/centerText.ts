// directives/centerText.ts
export default {
  mounted(el: HTMLTextAreaElement) {
    centerTextVertically(el)
  },
  updated(el: HTMLTextAreaElement) {
    centerTextVertically(el)
  },
}

export function centerTextVertically(el: HTMLTextAreaElement) {
  el.style.paddingTop = '14px'
  requestAnimationFrame(() => {
    const scrollHeight = el.scrollHeight
    const clientHeight = el.clientHeight
    if (scrollHeight > clientHeight) {
      const padding = '0'
      el.style.paddingTop = `${padding}px`
    }
  })
}