<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { InputText } from 'primevue'
import type { ICompany } from '@/types/app'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { clone, equals } from 'ramda'
const props = defineProps<{
  data: ICompany
}>()

const emit = defineEmits<{
  (e: 'save', data: ICompany): void
}>()

watch(
  () => props.data,
  (newVal) => {
    formData.value = clone(newVal)
  },
  {
    once: true,
  }
)
const formData = ref<ICompany>(
  clone(props.data) || {
    name: '',
    description: '',
    contacts: {
      address: '',
      mobilePhone: '',
      links: {
        TELEGRAM: [],
      },
    },
  }
)

const save = () => {
  emit('save', formData.value)
}

const disabledSave = computed(() => {
  return equals(props.data, formData.value)
})
</script>

<template>
  <div class="container">
    <h2 class="form-about__title">О компании</h2>

    <form class="form-about__form">
      <FloatLabel variant="on">
        <InputText
          id="on_label"
          v-model="formData.name"
          class="form-about__form-item"
        />
        <label for="on_label">Название</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Textarea
          autoResize
          id="on_label"
          v-model="formData.description"
          class="form-about__form-item"
        />
        <label for="on_label">Описание</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText
          id="on_label"
          class="form-about__form-item"
          v-model="formData.contacts.address"
        />
        <label for="on_label">Адрес</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText
          id="on_label"
          class="form-about__form-item"
          v-model="formData.contacts.mobilePhone"
        />
        <label for="on_label">Телефон</label>
      </FloatLabel>
      <!-- <InputText
        v-model="form.contacts.links.TELEGRAM[0].name"
        placeholder="Имя"
      />
      <InputText
        v-model="form.contacts.links.TELEGRAM[0].link"
        placeholder="Ссылка"
      /> -->
      <Button label="Сохранить" @click="save" :disabled="disabledSave" />
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-about__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.form-about__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
}

.form-about__form-item {
  width: 100%;
}
</style>
