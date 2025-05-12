import { ref } from 'vue';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookies'
import router from '@/router';

export const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJpZCI6MSwibG9naW4iOiJseHdxVlFNN3hEIiwic3ViIjoibHh3cVZRTTd4RCIsImlhdCI6MTc0NzA3MzYxMCwiZXhwIjoxNzQ3MjE3NjEwfQ.9BHKARZSD49JnqJ1yZHv5LzVa6vEbS62HyUq9LKXM10'
const BASE_URL = 'https://zvereva-law.ru/';


// Создаем экземпляр axios с базовыми настройками
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