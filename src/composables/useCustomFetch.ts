import { ref } from 'vue';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJpZCI6MSwibG9naW4iOiJseHdxVlFNN3hEIiwic3ViIjoibHh3cVZRTTd4RCIsImlhdCI6MTc0Njg2Njk4MSwiZXhwIjoxNzQ3MDEwOTgxfQ.0SPLGZjgqnTiaY2vtXMkgnIyXBxs07IimTo21TXPAa8'
const BASE_URL = 'https://zvereva-law.ru/';


// Создаем экземпляр axios с базовыми настройками
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

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