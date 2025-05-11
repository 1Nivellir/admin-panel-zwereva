<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { API_TOKEN } from '@/composables/useCustomFetch'
import { setCookie } from '@/utils/cookies'
import { nextTick } from 'vue'
const router = useRouter()
import { Button, InputText } from 'primevue'

const handleCLick = () => {
  setCookie('token', API_TOKEN)
  nextTick(() => {
    router.push('/applications')
  })
}
</script>

<template>
  <div class="container">
    <div class="form__wrapper">
      <h2 class="form__title">Login</h2>
      <form class="form">
        <InputText
          class="form__input"
          type="text"
          placeholder="Username"
          name="Login"
        />
        <InputText placeholder="Password" type="text" />
        <Button @click="handleCLick">Авторизоваться</Button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 350px;
  width: 100%;

  &__wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    justify-content: center;
  }

  &__input {
    width: 100%;
  }

  &__title {
    font-size: 36px;
    line-height: normal;
    font-weight: 500;
  }
}
</style>
