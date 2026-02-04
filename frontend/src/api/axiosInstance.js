import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Add response interceptor to handle Vercel 404/405 (returning HTML) or Network Errors
axiosInstance.interceptors.response.use(
  (response) => {
    // If we get an HTML response from an API call, it's likely a 404/405 rewrite loop
    if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE html>')) {
        return Promise.reject(new Error("API_NOT_FOUND"))
    }
    return response
  },
  (error) => {
    // Check if the error response data is HTML (common with Vercel rewrites on 404/500)
    if (error.response && typeof error.response.data === 'string' && error.response.data.startsWith('<!DOCTYPE html>')) {
       return Promise.reject(new Error("API_NOT_FOUND"))
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
