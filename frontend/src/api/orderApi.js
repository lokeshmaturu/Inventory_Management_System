import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  createSale: async (data) => {
    try { return await axios.post('/sales', data) }
    catch { return { data: mock.createSale(data) } }
  },
  listSales: async (params) => {
    try { return await axios.get('/sales', { params }) }
    catch { return { data: mock.listSales(params) } }
  },
  createPurchase: async (data) => {
    try { return await axios.post('/purchases', data) }
    catch { return { data: mock.createPurchase(data) } }
  },
  listPurchases: async (params) => {
    try { return await axios.get('/purchases', { params }) }
    catch { return { data: mock.listPurchases(params) } }
  },
  getInvoice: async (id) => {
    try { return await axios.get(`/invoices/${id}`) }
    catch { return { data: null } }
  },
}
