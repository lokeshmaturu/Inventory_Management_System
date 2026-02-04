import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  list: async (params) => {
    // try { return await axios.get('/products', { params }) }
    /* Backend removed until commanded */
    return { data: mock.getProducts(params) }
  },
  get: async (id) => {
    // try { return await axios.get(`/products/${id}`) }
    return { data: mock.getProduct(id) }
  },
  create: async (data) => {
    // try { return await axios.post('/products', data) }
    return { data: mock.createProduct(data) }
  },
  update: async (id, data) => {
    // try { return await axios.put(`/products/${id}`, data) }
    return { data: mock.updateProduct(id, data) }
  },
  remove: async (id) => {
    // try { return await axios.delete(`/products/${id}`) }
    return { data: mock.deleteProduct(id) }
  },
}
