import React, { useState } from 'react'
import { Package, Truck, CheckCircle, Calendar, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const OrderHistory = () => {
  const { user } = useAuth()
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Mock order data
  const orders = [
    {
      id: 'SH123456789',
      date: '2023-06-12',
      status: 'delivered',
      total: 349.98,
      items: [
        { id: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
        { id: 2, name: 'Phone Case', quantity: 2, price: 24.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' }
      ]
    },
    {
      id: 'SH987654321',
      date: '2023-05-28',
      status: 'shipped',
      total: 399.99,
      items: [
        { id: 3, name: 'Smart Watch Pro', quantity: 1, price: 399.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }
      ]
    },
    {
      id: 'SH456789123',
      date: '2023-05-15',
      status: 'delivered',
      total: 129.99,
      items: [
        { id: 4, name: 'Designer Backpack', quantity: 1, price: 129.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your order history.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                      <p className="text-gray-600 text-sm">{formatDate(order.date)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-4 overflow-x-auto">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex-shrink-0 w-16">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {selectedOrder?.id === order.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded mr-3"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                        <p className="text-lg font-bold">Total: <span className="text-primary">${order.total.toFixed(2)}</span></p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-blue-800">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-green-800">Delivered</p>
                    <p className="text-2xl font-bold text-green-600">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-600">
                      ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center text-sm">
                      <div className="mr-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium">Order #{order.id.substring(0, 6)}...</p>
                        <p className="text-gray-600">{formatDate(order.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderHistory