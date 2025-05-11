import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { useRouter } from 'vue-router'
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJpZCI6MSwibG9naW4iOiJseHdxVlFNN3hEIiwic3ViIjoibHh3cVZRTTd4RCIsImlhdCI6MTc0Njg2Njk4MSwiZXhwIjoxNzQ3MDEwOTgxfQ.0SPLGZjgqnTiaY2vtXMkgnIyXBxs07IimTo21TXPAa8'

function authCheck() {
  const router = useRouter()
  const token = getCookie('token')
  if (!token) {
    router.push('/auth')
  } else {
    router.push('/applications')
  }
}

// Установить куку
// setCookie('token', token, { 
//   expires: 7, // срок действия 7 дней
//   path: '/', // путь, где кука доступна
//   secure: true, // только для HTTPS
//   sameSite: 'strict' // защита от CSRF
// })

// Получить значение куки

// Удалить куку

export default authCheck
