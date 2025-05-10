<script setup lang="ts" generic="T extends Record<string, any>">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from '@tanstack/vue-table'
import { fetchImageBlob } from '@/utils/getImageForBlob'
import { ref, computed, watch, type Ref, readonly } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from 'primevue'
import styles from './table.module.css'
import ToggleButton from 'primevue/togglebutton'
import { equals, clone } from 'ramda'
import { useCustomFetch } from '@/composables/useCustomFetch'

type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

const imagesUrls = ref<Record<string, string>>({})

const getImageUrl = (imageId: string) => {
  return imagesUrls.value[imageId]
}
const emit = defineEmits(['updateData', 'removeItem'])

const removeItem = (id: number, index: number) => {
  emit('removeItem', id, index)
}

const props = defineProps<{
  applications: T[]
  columnsConfig?: ColumnDef<T>[]
}>()

const localData = ref<Writable<T>[]>(clone(props.applications)) as Ref<
  Writable<T>[]
>

const getShowSaveButton = (index: number) => {
  const oldValue = { ...props.applications[index] }
  const newValue = { ...localData.value[index] }
  const result = !equals(newValue, oldValue)
  return result
}

watch(
  () => props.applications,
  async (newValue) => {
    localData.value = clone(newValue)
    if (newValue.length === 0) return
    try {
      const imageFetchPromises = newValue
        .filter((item) => item.imageId)
        .map(async (item) => {
          const url = await fetchImageBlob(item.imageId)
          return { imageId: item.imageId, url }
        })
      const results = await Promise.all(imageFetchPromises)
      results.forEach(({ imageId, url }) => {
        if (url) {
          imagesUrls.value[imageId] = url
        }
      })
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error)
    }
  }
)

const columnHelper = createColumnHelper<T>()

const columns = computed(() => {
  if (props.columnsConfig) return props.columnsConfig

  if (props.applications.length === 0) return []

  return Object.keys(props.applications[0]).map((key) => {
    return columnHelper.accessor(key as any, {
      header: () => key.charAt(0).toUpperCase() + key.slice(1),
      cell: (info) => info.getValue(),
    })
  })
})

const table = useVueTable({
  get data() {
    return localData.value
  },
  get columns() {
    return columns.value
  },
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    size: 200, //starting column size
    minSize: 50, //enforced during column resizing
    maxSize: 500, //enforced during column resizing
  },
})

const whenChangeInput = (value: string, rowIndex: number, columnId: string) => {
  ;(localData.value[rowIndex][columnId] as any) = value
}

const getHeightTextArea = (params: any) => {
  const el = params.target
  const height = el.scrollHeight
  el.style.height = height > 50 ? height + 'px' : '50px'
}
const getHeightDefaultTextArea = (params: any) => {
  const el = params.target
  el.style.height = '50px'
}

// watch(imagesUrls.value, (newValue) => {
//   console.log(newValue)
// })
const handleFileChange = async (
  event: Event,
  rowIndex: number,
  columnId: string
) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  try {
    const response = await useCustomFetch('dashboard/file', {
      method: 'POST',
      data: file,
    })
    const imageId = response.data.uuid
    const url = (await fetchImageBlob(imageId)) as string

    imagesUrls.value[imageId] = url
    ;(localData.value[rowIndex][columnId] as any) = imageId
    localData.value = clone(localData.value)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="p-2">
    <table>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :class="styles.row"
        >
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <template v-if="cell.column.id === 'actions'">
              <div :class="styles.actionsWrapper">
                <Button
                  v-if="getShowSaveButton(row.index)"
                  @click.prevent="emit('updateData', row.original, row.index)"
                  size="small"
                  class="toggle-button"
                  icon="pi pi-check"
                />
                <div v-else style="width: 36px"></div>
                <Button
                  size="small"
                  class="toggle-button"
                  severity="secondary"
                  icon="pi pi-trash"
                  aria-label="Save"
                  @click="removeItem(row.original.id, row.index)"
                />
              </div>
            </template>

            <template
              v-else-if="
                ['show', 'deleted', 'active', 'processed'].includes(
                  cell.column.id
                )
              "
            >
              <div :class="styles.toggleButtonWrapper">
                <ToggleButton
                  class="toggle-button"
                  size="small"
                  v-model="row.original[cell.column.id]"
                  onLabel="+"
                  offLabel="-"
                />
              </div>
            </template>

            <template
              v-else-if="cell.column.columnDef.meta?.editable === false"
            >
              <div :class="styles.spanWrapper">
                <span>{{ cell.getValue() }}</span>
              </div>
            </template>

            <template v-else-if="cell.column.id === 'imageId'">
              <div class="image-upload-container">
                <img
                  class="image"
                  :src="imagesUrls[cell.getValue() as string] || '/img/noImage.png'"
                />
                <label class="custom-file-upload">
                  <input
                    type="file"
                    name="images"
                    class="file-input"
                    @change="
                      (e) => handleFileChange(e, row.index, cell.column.id)
                    "
                  />
                  <i class="pi pi-upload"></i>
                </label>
              </div>
            </template>

            <template v-else>
              <div
                :title="(cell.getValue() as string)"
                :class="styles.textAreaWrapper"
              >
                <textarea
                  @focus="(e) => getHeightTextArea(e)"
                  @focusout="(e) => getHeightDefaultTextArea(e)"
                  :class="styles.input_table"
                  :value="localData[row.index][cell.column.id]"
                  @input="
                    whenChangeInput(
                      ($event?.target as HTMLInputElement)?.value,
                      row.index,
                      cell.column.id
                    )
                  "
                />
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.toggle-button {
  width: 34px;
  height: 29px;
  padding: 3px 12px;
}
.fileUpload {
  appearance: none;
}

.image {
  width: 40px;
  height: 40px;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  text-align: start;
  border-bottom: 1px solid lightgray;
  padding: 2px 4px;
}

td {
  border-bottom: 1px solid lightgray;
}
tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
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
