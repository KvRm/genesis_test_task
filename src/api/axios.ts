import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 2500,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
})
