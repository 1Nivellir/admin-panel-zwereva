import Cookies from 'js-cookie'

export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(name, value, options)
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

export const removeCookie = (name: string) => {
  Cookies.remove(name)
}

// Пример использования:
// setCookie('user', 'John', { expires: 7 }) // кука на 7 дней
// getCookie('user') // получить значение
// removeCookie('user') // удалить куку 