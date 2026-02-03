import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  list: async (params) => {
    try { return await axios.get('/suppliers', { params }) }
    catch { return { data: mock.getSuppliers() } }
  },
  get: async (id) => {
    try { return await axios.get(`/suppliers/${id}`) }
    catch { return { data: mock.getSupplier(id) } }
  },
  create: async (data) => {
    try { return await axios.post('/suppliers', data) }
    catch { return { data: null } }
  },
  update: async (id, data) => {
    try { return await axios.put(`/suppliers/${id}`, data) }
    catch { return { data: null } }
  },
  remove: async (id) => {
    try { return await axios.delete(`/suppliers/${id}`) }
    catch { return { data: true } }
  },
  products: async (id) => {
    try { return await axios.get(`/suppliers/${id}/products`) }
    catch { return { data: mock.getSupplierProducts(id) } }
  },
}
