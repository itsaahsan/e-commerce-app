import React, { useState } from 'react'
import { Package, Truck, CheckCircle, XCircle, MapPin, Calendar } from 'lucide-react'

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [orderStatus, setOrderStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock order data
  const mockOrders = {
    'SH123456789': {
      id: 'SH123456789',
      status: 'shipped',
      estimatedDelivery: '2023-06-15',
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 },
        { name: 'Phone Case', quantity: 2, price: 24.99 }
      ],
      trackingEvents: [
        {
          id: 1,
          status: 'ordered',
          title: 'Order Placed',
          description: 'Your order has been placed successfully',
          date: '2023-06-10T10:30:00Z',
          completed: true
        },
        {
          id: 2,
          status: 'processed',
          title: 'Order Processed',
          description: 'We\'ve processed your order and it\'s ready to ship',
          date: '2023-06-11T14:15:00Z',
          completed: true
        },
        {
          id: 3,
          status: 'shipped',
          title: 'Order Shipped',
          description: 'Your order has been shipped and is on its way',
          date: '2023-06-12T09:45:00Z',
          completed: true
        },
        {
          id: 4,
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Your package is out for delivery',
          date: null,
          completed: false
        },
        {
          id: 5,
          status: 'delivered',
          title: 'Delivered',
          description: 'Your package has been delivered',
          date: null,
          completed: false
        }
      ]
    },
    'SH987654321': {
      id: 'SH987654321',
      status: 'delivered',
      estimatedDelivery: '2023-06-12',
      items: [
        { name: 'Smart Watch Pro', quantity: 1, price: 399.99 }
      ],
      trackingEvents: [
        {
          id: 1,
          status: 'ordered',
          title: 'Order Placed',
          description: 'Your order has been placed successfully',
          date: '2023-06-05T11:20:00Z',
          completed: true
        },
        {
          id: 2,
          status: 'processed',
          title: 'Order Processed',
          description: 'We\'ve processed your order and it\'s ready to ship',
          date: '2023-06-06T13:45:00Z',
          completed: true
        },
        {
          id: 3,
          status: 'shipped',
          title: 'Order Shipped',
          description: 'Your order has been shipped and is on its way',
          date: '2023-06-07T08:30:00Z',
          completed: true
        },
        {
          id: 4,
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Your package is out for delivery',
          date: '2023-06-12T10:15:00Z',
          completed: true
        },
        {
          id: 5,
          status: 'delivered',
          title: 'Delivered',
          description: 'Your package has been delivered',
          date: '2023-06-12T14:30:00Z',
          completed: true
        }
      ]
    }
  }

  const handleTrackOrder = (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const order = mockOrders[trackingNumber.toUpperCase()]
      setOrderStatus(order || 'not_found')
      setIsLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <Package className="w-5 h-5" />
      case 'processed':
        return <Package className="w-5 h-5" />
      case 'shipped':
        return <Truck className="w-5 h-5" />
      case 'out_for_delivery':
        return <Truck className="w-5 h-5" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Track Your Order</h2>
        
        <form onSubmit={handleTrackOrder} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your order number (e.g., SH123456789)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </button>
          </div>
        </form>

        {orderStatus === 'not_found' && (
          <div className="text-center py-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Order Not Found</h3>
            <p className="text-gray-600">Please check your order number and try again.</p>
          </div>
        )}

        {orderStatus && orderStatus !== 'not_found' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">Order #{orderStatus.id}</h3>
                <p className="text-gray-600">
                  Estimated Delivery: {new Date(orderStatus.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                orderStatus.status === 'delivered' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {orderStatus.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold mb-3">Order Items</h4>
              <div className="space-y-3">
                {orderStatus.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div>
              <h4 className="font-semibold mb-3">Tracking Timeline</h4>
              <div className="space-y-4">
                {orderStatus.trackingEvents.map((event) => (
                  <div key={event.id} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`rounded-full p-2 ${
                        event.completed 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {getStatusIcon(event.status)}
                      </div>
                      {event.id !== orderStatus.trackingEvents.length && (
                        <div className={`w-1 h-full ${
                          event.completed ? 'bg-primary' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <h5 className={`font-medium ${
                        event.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {event.title}
                      </h5>
                      <p className={`text-sm ${
                        event.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {event.description}
                      </p>
                      {event.date && (
                        <p className="text-xs text-gray-50 mt-1">
                          {formatDate(event.date)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
                <div>
                  <h5 className="font-medium text-blue-800">Delivery Information</h5>
                  <p className="text-sm text-blue-700">
                    Your package will be delivered to your address on {new Date(orderStatus.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!orderStatus && (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Your Order</h3>
            <p className="text-gray-600">Enter your order number above to track your shipment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderTracking
