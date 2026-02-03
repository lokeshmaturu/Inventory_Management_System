const STORAGE_KEY = 'demoData'

function readData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { users:[], products:[], suppliers:[], orders:[], auditLogs:[] }
  }catch(e){
    return { users:[], products:[], suppliers:[], orders:[], auditLogs:[] }
  }
}

function writeData(d){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(d)) }catch(e){}
}

export default {
  // Products
  getProducts(params){
    const { products } = readData()
    return products
  },
  getProduct(id){
    const { products } = readData()
    return products.find(p => String(p.id) === String(id)) || null
  },
  createProduct(data){
    const d = readData()
    const id = (d.products.reduce((m,p)=>Math.max(m,p.id||0),0) || 0) + 1
    const item = { id, ...data }
    d.products.push(item)
    writeData(d)
    return item
  },
  updateProduct(id, data){
    const d = readData()
    const idx = d.products.findIndex(p => String(p.id) === String(id))
    if (idx === -1) return null
    d.products[idx] = { ...d.products[idx], ...data }
    writeData(d)
    return d.products[idx]
  },
  deleteProduct(id){
    const d = readData()
    const product = d.products.find(p => String(p.id) === String(id))
    d.products = d.products.filter(p => String(p.id) !== String(id))
    // add audit log entry
    try{
      d.auditLogs = d.auditLogs || []
      d.auditLogs.push({ id: (d.auditLogs.reduce((m,a)=>Math.max(m,a.id||0),0) || 0) + 1, user: 'System', action: `Removed product ${product ? product.name : id}`, date: new Date().toISOString() })
    }catch(e){}
    writeData(d)
    return true
  },


  // Suppliers
  getSuppliers(){
    const { suppliers } = readData()
    return suppliers
  },
  getSupplier(id){
    const { suppliers } = readData()
    return suppliers.find(s => String(s.id) === String(id)) || null
  },
  getSupplierProducts(id){
    const { products } = readData()
    return products.filter(p => String(p.supplierId) === String(id))
  },

  // Orders / sales / purchases
  listSales(){
    const { orders } = readData()
    return orders.filter(o=>o.type === 'sale')
  },
  listPurchases(){
    const { orders } = readData()
    return orders.filter(o=>o.type === 'purchase')
  },
  createSale(payload){
    const d = readData()
    const id = (d.orders.reduce((m,o)=>Math.max(m,o.id||0),0) || 0) + 1
    const order = { id, type:'sale', ...payload }
    d.orders.push(order)
    // reduce product quantity
    const prod = d.products.find(p=>String(p.id) === String(payload.productId))
    if (prod){ prod.quantity = (prod.quantity || 0) - (payload.qty || 0) }
    // audit
    try{
      d.auditLogs = d.auditLogs || []
      d.auditLogs.push({ id: (d.auditLogs.reduce((m,a)=>Math.max(m,a.id||0),0) || 0) + 1, user: payload.user || 'System', action: `Sale: ${payload.qty} x ${prod ? prod.name : payload.productId}`, date: new Date().toISOString() })
    }catch(e){}
    writeData(d)
    return order
  },
  createPurchase(payload){
    const d = readData()
    const id = (d.orders.reduce((m,o)=>Math.max(m,o.id||0),0) || 0) + 1
    const order = { id, type:'purchase', ...payload }
    d.orders.push(order)
    // increase product quantity
    const prod = d.products.find(p=>String(p.id) === String(payload.productId))
    if (prod){ prod.quantity = (prod.quantity || 0) + (payload.qty || 0) }
    // audit
    try{
      d.auditLogs = d.auditLogs || []
      d.auditLogs.push({ id: (d.auditLogs.reduce((m,a)=>Math.max(m,a.id||0),0) || 0) + 1, user: payload.user || 'System', action: `Purchase: ${payload.qty} x ${prod ? prod.name : payload.productId}`, date: new Date().toISOString() })
    }catch(e){}
    writeData(d)
    return order
  },

  // Reports
  salesSummary(){
    const d = readData()
    const today = new Date().toISOString().slice(0,10)
    const todaySales = d.orders.filter(o=>o.type==='sale' && o.date && o.date.slice(0,10)===today).reduce((s,o)=>s+(o.qty||0),0)
    const todayPurchase = d.orders.filter(o=>o.type==='purchase' && o.date && o.date.slice(0,10)===today).reduce((s,o)=>s+(o.qty||0),0)
    return { todaySales, todayPurchase, totalProducts: d.products.length }
  },
  stockSummary(){
    const d = readData()
    const lowStock = d.products.filter(p => (p.quantity||0) <= (p.minQuantity||0))
    return { lowStock, totalProducts: d.products.length }
  },

  // Audit logs
  getAuditLogs(){
    const d = readData()
    return d.auditLogs || []
  }
}
