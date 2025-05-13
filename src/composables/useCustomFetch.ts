import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookies'
import router from '@/router';
const BASE_URL = 'https://zvereva-law.ru/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
 (error) => {
    if (error.response?.status === 403) {
        router.push('/auth')
    }

    if (error.message === 'Network Error') {
     
      router.push('/auth')
    }
    return Promise.reject(error)
  }
)

export const useCustomFetch = async (url: string,
  options: AxiosRequestConfig = {}) => {
  return axiosInstance({
    url,
    ...options,
    headers: {
      ...options.headers,
    }
  })
};