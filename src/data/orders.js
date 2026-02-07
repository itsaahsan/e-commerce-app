export const mockOrders = [
  {
    id: 1001,
    buyerId: 1,
    items: [
      { productId: 1, quantity: 1, sellerId: 101 },
      { productId: 2, quantity: 2, sellerId: 102 },
    ],
    status: 'Pending',
    total: 350.50,
    date: '2026-02-06',
  },
  {
    id: 1002,
    buyerId: 2,
    items: [
      { productId: 10, quantity: 1, sellerId: 101 },
    ],
    status: 'Shipped',
    total: 120.00,
    date: '2026-02-05',
  },
  {
    id: 1003,
    buyerId: 3,
    items: [
      { productId: 25, quantity: 1, sellerId: 103 },
      { productId: 50, quantity: 1, sellerId: 101 },
    ],
    status: 'Delivered',
    total: 85.75,
    date: '2026-02-01',
  },
];
