import axios from './axiosInstance'
import mock from './mockBackend'

export default {
  salesSummary: async (params) => {
    try { return await axios.get('/reports/sales', { params }) }
    catch { return { data: mock.salesSummary() } }
  },
  stockSummary: async (params) => {
    try { return await axios.get('/reports/stock', { params }) }
    catch { return { data: mock.stockSummary() } }
  },
  fastSlow: async () => {
    try { return await axios.get('/reports/fast-slow') }
    catch { return { data: [] } }
  },
}
