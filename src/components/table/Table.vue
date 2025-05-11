<script setup lang="ts" generic="T extends Record<string, any>">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from '@tanstack/vue-table'
import { fetchImageBlob } from '@/utils/getImageForBlob'
import { ref, computed, watch, type Ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from 'primevue'
import styles from './table.module.css'
import ToggleButton from 'primevue/togglebutton'
import { equals, clone } from 'ramda'
import { useCustomFetch } from '@/composables/useCustomFetch'
import ModalEditTable from '@/components/common/ModalEditTable.vue'
import TableUploadImage from '@/components/table/TableUploadImage.vue'

type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

const imagesUrls = ref<Record<string, string>>({}),
  props = defineProps<{
    applications: T[]
    columnsConfig?: ColumnDef<T>[]
    columnVisibility?: Record<string, boolean> | undefined
    editable?: boolean
  }>(),
  emit = defineEmits(['updateData', 'removeItem']),
  localData = ref<Writable<T>[]>(clone(props.applications)) as Ref<
    Writable<T>[]
  >,
  columnHelper = createColumnHelper<T>(),
  editRowInModal = ref({
    editRowInModal: {} as any,
    index: 0,
  }),
  isOpenModal = ref(false)

const removeItem = (id: number, index: number) => {
  emit('removeItem', id, index)
}

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
  getRowId: (row) => row.id,
  initialState: {
    columnVisibility: props.columnVisibility,
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

const handleRowClick = (row: T, index: number) => {
  if (!props.editable) {
    editRowInModal.value.editRowInModal = row
    editRowInModal.value.index = index
    isOpenModal.value = true
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
          v-for="(row, index) in table.getRowModel().rows"
          :key="row.id"
          :class="styles.row"
          @click="handleRowClick(row.original, row.index)"
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
                  onLabel="Да"
                  offLabel="Нет"
                />
              </div>
            </template>

            <template
              v-else-if="
                cell.column.columnDef.meta?.editable === false ||
                !props.editable
              "
            >
              <div :class="styles.spanWrapper">
                <span v-if="cell.column.id === 'id'" class="text-center">{{
                  (cell.getValue() && (cell.getValue() as number) > 0
                    ? cell.getValue()
                    : '') || ''
                }}</span>
                <span v-else class="text-center">{{ cell.getValue() }}</span>
              </div>
            </template>

            <template v-else-if="cell.column.id === 'imageId'">
              <TableUploadImage
                v-model:idImage="localData[row.index][cell.column.id]"
              />
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
    <ModalEditTable
      :row="editRowInModal.editRowInModal"
      v-model:isOpen="isOpenModal"
      v-if="isOpenModal"
      @saveData="emit('updateData', $event, editRowInModal.index)"
    />
  </div>
</template>

<style scoped lang="scss">
.toggle-button {
  height: 29px;
  padding: 3px 12px;
}
.id-cell {
  display: block;
  min-width: 50px;
}
.text-center {
  display: flex;
  align-items: center;
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
</style>
