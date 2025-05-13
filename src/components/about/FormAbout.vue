<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { InputText, ButtonGroup } from 'primevue'
import type { ICompany, ISocial, ILinks } from '@/types/app'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { clone, equals } from 'ramda'
import Chip from 'primevue/chip'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
const props = defineProps<{
    data: ICompany
    socialData: ILinks
  }>(),
  isShowSocial = ref(false),
  emit = defineEmits<{
    save: [ICompany]
    saveSocial: [string, 'TELEGRAM' | 'WHATSAPP']
    removeSocial: [string, 'TELEGRAM' | 'WHATSAPP']
  }>(),
  formData = ref<ICompany>(
    clone(props.data) || {
      name: '',
      description: '',
      contacts: {
        address: '',
        mobilePhone: '',
      },
    }
  ),
  socialData = ref<ILinks>(
    clone(props.socialData) || {
      TELEGRAM: [],
      WHATSAPP: [],
    }
  )

watch(
  () => props.socialData,
  (newVal) => {
    newVal.TELEGRAM?.forEach((item) => {
      item.link = atob(item.link)
    })
    newVal.WHATSAPP?.forEach((item) => {
      item.link = atob(item.link)
    })
    socialData.value = clone(newVal)
  }
)
watch(
  () => props.data,
  (newVal) => {
    formData.value = clone(newVal)
  }
)

const save = () => {
  emit('save', formData.value)
}

const disabledSave = computed(() => {
  return equals(props.data, formData.value)
})

const isShowSaveSocial = (type: string, item: ISocial, index: number) => {
  const elem = props.socialData[type as keyof ILinks]?.[index]
  if (elem) {
    return false
  }
  return true
}

const saveSocialLink = (item: ISocial, type: 'TELEGRAM' | 'WHATSAPP') => {
  emit('saveSocial', item.link, type)
}

const addSocialLink = (type: 'TELEGRAM' | 'WHATSAPP') => {
  socialData.value[type]?.push({
    link: '',
  })
}
</script>

<template>
  <div>
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

      <div class="form-about__form-links">
        <div class="form-about__form-links-header">
          <Chip
            :label="`Социальные&nbsp;сети`"
            size="small"
            @click="isShowSocial = !isShowSocial"
            class="form-about__form-links-chip"
          />
          <span class="divider"></span>
          <i
            :class="
              isShowSocial ? 'pi pi-sort-up-fill' : 'pi pi-sort-down-fill'
            "
            style="color: #878787; font-size: 14px"
            @click="isShowSocial = !isShowSocial"
          />
        </div>
        <Transition name="social" mode="out-in">
          <div v-if="isShowSocial" class="form-about__form-links-content">
            <div class="form-about__form-links-content-header">
              <ButtonGroup>
                <Button
                  severity="secondary"
                  size="small"
                  label="Whatsapp"
                  icon="pi pi-plus"
                  @click="addSocialLink('WHATSAPP')"
                />
                <Button
                  severity="secondary"
                  size="small"
                  label="Telegram"
                  iconPos="right"
                  icon="pi pi-plus"
                  @click="addSocialLink('TELEGRAM')"
                />
              </ButtonGroup>
            </div>

            <InputGroup
              v-for="(item, index) in socialData.TELEGRAM"
              :key="index"
            >
              <FloatLabel variant="on">
                <InputText
                  class="form-about__form-item"
                  v-model="item.link"
                  icon="pi pi-sort-down-fill"
                />
                <label for="on_label">Telegram</label>
              </FloatLabel>

              <InputGroupAddon>
                <Button
                  icon="pi pi-trash"
                  severity="secondary"
                  v-tooltip.top="'Удалить'"
                  class="remove-button"
                  @click="emit('removeSocial', item.link, 'TELEGRAM')"
                />
              </InputGroupAddon>
              <Button
                v-if="isShowSaveSocial('TELEGRAM', item, index)"
                v-tooltip.top="'Сохранить'"
                icon="pi pi-check"
                @click="saveSocialLink(item, 'TELEGRAM')"
              />
            </InputGroup>

            <InputGroup
              v-for="(item, index) in socialData.WHATSAPP"
              :key="index"
            >
              <FloatLabel variant="on">
                <InputText class="form-about__form-item" v-model="item.link" />
                <label for="on_label">Whatsapp</label>
              </FloatLabel>

              <InputGroupAddon>
                <!-- <Button
                  icon="pi pi-check"
                  v-show="isShowSaveSocial('WHATSAPP', item, index)"
                  v-tooltip.top="'Сохранить'"
                  @click="saveSocialLink(item, 'WHATSAPP')"
                /> -->
                <Button
                  icon="pi pi-trash"
                  severity="secondary"
                  v-tooltip.top="'Удалить'"
                  class="remove-button"
                  @click="emit('removeSocial', item.link, 'WHATSAPP')"
                />
              </InputGroupAddon>
              <Button
                icon="pi pi-check"
                v-if="isShowSaveSocial('WHATSAPP', item, index)"
                v-tooltip.top="'Сохранить'"
                @click="saveSocialLink(item, 'WHATSAPP')"
              />
            </InputGroup>
          </div>
        </Transition>
      </div>
      <Button label="Сохранить" @click="save" :disabled="disabledSave" />
    </form>
  </div>
</template>

<style scoped lang="scss">
// .remove-button {
//   width: 44px;
// }

.form-about__form-links-content-header {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}
.divider {
  height: 1px;
  width: 100%;
  display: block;
  background-color: #e0e0e0;
}
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

.form-about__form-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-about__form-links-chip {
  cursor: pointer;
  user-select: none;
  width: fit-content;
  padding: 3px 13px;
}

.form-about__form-links-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-about__form-links-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  overflow: hidden;
}

.social-enter-active,
.social-leave-active {
  transition: opacity 0.3s ease, min-height 0.3s ease-in-out;
  opacity: 1;
}

.social-enter-from,
.social-leave-to {
  opacity: 0;
}
</style>
