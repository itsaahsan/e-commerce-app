import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from '../utils/stripe'
import CheckoutForm from '../components/CheckoutForm'
import { useStore } from '../store/useStore'

const Checkout = () => {
  const { cart, getCartTotal } = useStore()
  const total = getCartTotal()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout