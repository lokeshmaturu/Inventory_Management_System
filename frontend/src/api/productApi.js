import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  list: async (params) => {
    try { return await axios.get('/products', { params }) }
    catch (err) { return { data: mock.getProducts(params) } }
  },
  get: async (id) => {
    try { return await axios.get(`/products/${id}`) }
    catch { return { data: mock.getProduct(id) } }
  },
  create: async (data) => {
    try { return await axios.post('/products', data) }
    catch { return { data: mock.createProduct(data) } }
  },
  update: async (id, data) => {
    try { return await axios.put(`/products/${id}`, data) }
    catch { return { data: mock.updateProduct(id, data) } }
  },
  remove: async (id) => {
    try { return await axios.delete(`/products/${id}`) }
    catch { return { data: mock.deleteProduct(id) } }
  },
}
