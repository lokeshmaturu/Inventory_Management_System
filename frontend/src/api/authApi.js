import axios from './axiosInstance'

export default {
  login: (credentials) => axios.post('/auth/login', credentials),
  register: (payload) => axios.post('/auth/register', payload),
}
