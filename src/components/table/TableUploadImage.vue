<template>
  <div class="image-upload-container">
    <img class="image" :src="urlImage || '/img/noImage.png'" />
    <label class="custom-file-upload">
      <input
        type="file"
        name="images"
        class="file-input"
        @change="handleFileChange"
      />
      <i class="pi pi-upload"></i>
    </label>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchImageBlob } from '@/utils/getImageForBlob'
import { useCustomFetch } from '@/composables/useCustomFetch'
const props = defineProps<{
    idImage: string
  }>(),
  urlImage = ref<string>(''),
  emit = defineEmits<{
    'update:idImage': [string]
  }>()

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  try {
    const response = await useCustomFetch('dashboard/file', {
      method: 'POST',
      data: file,
    })
    const imageId = response.data.uuid
    emit('update:idImage', imageId)
    const url = (await fetchImageBlob(imageId)) as string
    urlImage.value = url as string
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const url = await fetchImageBlob(props.idImage)
  urlImage.value = url as string
})
</script>

<style scoped>
.fileUpload {
  appearance: none;
}

.image {
  width: 40px;
  height: 40px;
}
.image-upload-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-file-upload {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s;

  .file-input {
    display: none;
  }

  i {
    font-size: 16px;
    color: #4b5563;
  }
}
</style>
