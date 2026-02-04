import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  list: async (params) => {
    // try { return await axios.get('/suppliers', { params }) }
    return { data: mock.getSuppliers() }
  },
  get: async (id) => {
    // try { return await axios.get(`/suppliers/${id}`) }
    return { data: mock.getSupplier(id) }
  },
  create: async (data) => {
    // try { return await axios.post('/suppliers', data) }
    return { data: null } // Mock not implemented fully for writes here yet
  },
  update: async (id, data) => {
    // try { return await axios.put(`/suppliers/${id}`, data) }
    return { data: null }
  },
  remove: async (id) => {
    // try { return await axios.delete(`/suppliers/${id}`) }
    return { data: true }
  },
  products: async (id) => {
    // try { return await axios.get(`/suppliers/${id}/products`) }
    return { data: mock.getSupplierProducts(id) }
  },
}
