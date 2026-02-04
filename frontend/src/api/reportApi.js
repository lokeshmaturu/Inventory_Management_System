import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  salesSummary: async (params) => {
    // try { return await axios.get('/reports/sales', { params }) }
    return { data: mock.salesSummary() }
  },
  stockSummary: async (params) => {
    // try { return await axios.get('/reports/stock', { params }) }
    return { data: mock.stockSummary() }
  },
  fastSlow: async () => {
    // try { return await axios.get('/reports/fast-slow') }
    return { data: [] }
  },
}
