import mock from './mockBackend'

export default {
  list: async () => {
    try {
      // no backend wrapper yet - return mock data
      return { data: mock.getAuditLogs() }
    } catch (err) {
      return { data: [] }
    }
  }
}
