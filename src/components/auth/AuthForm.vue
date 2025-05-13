<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { setCookie } from '@/utils/cookies'
import { nextTick, ref } from 'vue'
import { AxiosError } from 'axios'
import { Button, InputText, Password } from 'primevue'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { API_SIGNIN } from '@/utils/apiPath'
const _errorMessage = ref(''),
  _router = useRouter(),
  _form = ref({
    login: '',
    password: '',
  })

const login = async () => {
  try {
    const response = await useCustomFetch(API_SIGNIN, {
      method: 'POST',
      data: _form.value,
    })

    setCookie('token', response.data.token)
    nextTick(() => {
      _router.push('/applications')
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      _errorMessage.value = error.response?.data || 'Ошибка авторизации'
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="form__wrapper">
      <h2 class="form__title">Вход</h2>
      <form class="form" @submit.prevent="login">
        <InputText
          class="form__input"
          type="text"
          placeholder="Логин"
          name="login"
          v-model="_form.login"
        />
        <div class="form__input">
          <Password
            class="form__input"
            style="width: 100%"
            :feedback="false"
            name="password"
            v-model="_form.password"
            placeholder="Пароль"
            toggleMask
          />
          <span class="form__error">{{ _errorMessage }}</span>
        </div>
        <Button type="submit">Авторизоваться</Button>
      </form>
    </div>
  </div>
</template>

<style>
.p-inputtext {
  width: 100%;
}
</style>

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

  &__error {
    color: red;
    font-size: 12px;
    font-weight: 500;
  }

  &__input {
    width: 100%;

    & input {
      width: 100%;
    }
  }

  &__title {
    font-size: 36px;
    line-height: normal;
    font-weight: 500;
  }
}
</style>
