import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data || error.message || 'An error occurred'
    return Promise.reject(new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)))
  }
)





