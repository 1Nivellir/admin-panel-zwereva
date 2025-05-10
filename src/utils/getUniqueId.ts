export const getUniqueId = (list: any[]) => {
  if (list.length === 0) return -1
  
  const minId = Math.min(...list.map(item => item.id))
  return minId > 0 ? -1 : minId - 1
}

