<template>
  <div class="modal-edit-table" @click="handleCLickClose">
    <div class="modal-edit-table__content">
      <button
        class="modal-edit-table__close pi pi-times"
        @click="emit('update:isOpen', false)"
      ></button>
      <form class="modal-edit-table__form">
        <label
          v-for="(value, key) in form"
          :key="key"
          class="modal-edit-table__form-label"
        >
          {{ NameHeader[key as keyof typeof NameHeader] }}
          <TableUploadImage
            v-if="key === 'imageId'"
            v-model:idImage="form[key]"
          />
          <ToggleButton
            v-else-if="['show', 'deleted', 'active', 'processed'].includes(key)"
            v-model="form[key]"
            size="small"
            onLabel="Да"
            class="modal-edit-table__form-toggle"
            offLabel="Нет"
          />
          <div v-else-if="key === 'id' || key === 'createdAt'">
            <span v-if="key === 'id'" class="modal-edit-table__form-span">{{
              Number(form[key]) > 0 ? Number(form[key]) : 'Не указано'
            }}</span>
            <span v-else class="modal-edit-table__form-span">{{
              form[key]
            }}</span>
          </div>
          <Textarea
            v-else-if="key === 'description'"
            v-model="form[key]"
            rows="5"
            placeholder="Введите описание"
            style="resize: none"
            cols="30"
          />
          <InputText
            v-else
            class="modal-edit-table__form-input"
            :label="key"
            v-model="form[key]"
            :placeholder="NameHeader[key as keyof typeof NameHeader]"
            size="small"
          />
        </label>
        <Button
          class="modal-edit-table__form-button"
          :disabled="!getIsDisabledBtn"
          @click.prevent="whenClickSave"
        >
          Сохранить
        </Button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
import { InputText, Textarea, Button } from 'primevue'
import { ref, watch, computed } from 'vue'
import TableUploadImage from '../table/TableUploadImage.vue'
import { NameHeader } from '@/utils/const/nameHeader'
import ToggleButton from 'primevue/togglebutton'
import { equals } from 'ramda'
const props = defineProps<{
  row: T
  isOpen: boolean
}>()

const form = ref<Record<string, any>>({} as Record<string, any>)

const emit = defineEmits<{
  'update:isOpen': [boolean]
  saveData: [typeof form.value]
}>()

const getIsDisabledBtn = computed(() => {
  return !equals(props.row, form.value)
})

const handleCLickClose = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('update:isOpen', false)
  }
}

watch(
  () => props.row,
  (newRow) => {
    form.value = { ...newRow }
  },
  { immediate: true }
)

const whenClickSave = () => {
  emit('saveData', form.value)
  emit('update:isOpen', false)
}
</script>

<style scoped lang="scss">
.modal-edit-table__form-input {
  width: 100%;
  max-width: 420px;
}
.modal-edit-table {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-edit-table__content {
  width: 70%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.modal-edit-table__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #000;
}

.modal-edit-table__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-edit-table__form-label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #767676;
  font-size: 12px;
}

.modal-edit-table__form-toggle {
  width: 100px;
}

.modal-edit-table__form-span {
  display: block;
  font-size: 14px;
  color: #000;
  color: #767676;
}
</style>
