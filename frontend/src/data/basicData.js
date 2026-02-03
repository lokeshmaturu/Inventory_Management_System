export const demoData = {
  users: [
    { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'Manager', email: 'manager@example.com', role: 'manager' },
    { id: 3, name: 'Staff', email: 'staff@example.com', role: 'staff' },
  ],
  suppliers: [
    { id: 1, name: 'Acme Supplies', contact: 'acme@example.com', phone: '555-0101' },
    { id: 2, name: 'Global Goods', contact: 'global@example.com', phone: '555-0102' },
  ],
  products: [
    {
      id: 1,
      name: 'Standard Widget',
      sku: 'WIDGET-STD',
      price: 12.5,
      quantity: 120,
      minQuantity: 10,
      supplierId: 1,
      category: 'Widgets',
      expiryDate: null,
      imageUrl: 'https://picsum.photos/id/1018/200/200'
    },
    {
      id: 2,
      name: 'Perishable Item',
      sku: 'PER-001',
      price: 4.25,
      quantity: 30,
      minQuantity: 5,
      supplierId: 2,
      category: 'Food',
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      imageUrl: 'https://picsum.photos/id/1025/200/200'
    },
    {
      id: 3,
      name: 'Fresh Milk',
      sku: 'MILK-001',
      price: 1.99,
      quantity: 20,
      minQuantity: 5,
      supplierId: 2,
      category: 'Dairy',
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
      imageUrl: 'https://picsum.photos/id/103/200/200'
    },
    {
      id: 4,
      name: 'Yogurt Cup',
      sku: 'YOG-004',
      price: 0.99,
      quantity: 5,
      minQuantity: 5,
      supplierId: 1,
      category: 'Dairy',
      expiryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // expired 3 days ago
      imageUrl: 'https://picsum.photos/id/104/200/200'
    },
    {
      id: 5,
      name: 'Wholegrain Bread',
      sku: 'BRD-01',
      price: 2.5,
      quantity: 12,
      minQuantity: 3,
      supplierId: 2,
      category: 'Bakery',
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(), // expires tomorrow
      imageUrl: 'https://picsum.photos/id/1050/200/200'
    },
  ],
  orders: [
    { id: 1, type: 'sale', productId: 1, qty: 3, date: new Date().toISOString(), userId: 3 },
    { id: 2, type: 'purchase', productId: 2, qty: 50, date: new Date().toISOString(), userId: 2 },
  ],
  auditLogs: [
    { id: 1, user: 'Admin', action: 'Created product Standard Widget', date: new Date().toISOString() },
    { id: 2, user: 'Manager', action: 'Adjusted stock for Perishable Item', date: new Date().toISOString() },
  ],
}
