export const fetchImageBlob = async (imageId: string | null) => {
  if (!imageId) return null
  const response = await fetch(`https://zvereva-law.ru/file/${imageId}`)

  const result = await response.blob()
  const blob = new Blob([result as any], {
    type: 'image/jpeg',
  })
  const url = URL.createObjectURL(blob)
  return url
}