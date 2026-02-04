import axios from './axiosInstance'

export default {
  login: (credentials) => {
     // axios.post('/auth/login', credentials),
     // Returning rejected promise to trigger AuthContext catch block which handles mock login? 
     // ACTUALLY, AuthContext should just create the mock user. 
     // Let's just properly error here or handle it in AuthContext to skip calling this entirely.
     return Promise.reject(new Error("MOCK_MODE")) // Trigger fallback immediately
  },
  register: (payload) => Promise.reject(new Error("MOCK_MODE")),
}
