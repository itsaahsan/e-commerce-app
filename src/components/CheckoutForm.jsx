import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js' // Keep for structure but not used for mock payment
import { useStore } from '../store/useStore'
import { useAuth } from '../contexts/AuthContext'
import { processMarketplacePayment } from '../utils/stripe'
import toast from 'react-hot-toast'

const CheckoutForm = () => {
  const stripe = useStripe() // Still need for Elements context, but not directly used
  const elements = useElements() // Still need for Elements context, but not directly used
  const { cart, getCartTotal, clearCart } = useStore()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  })

  const total = getCartTotal()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    // In a real app, you'd perform client-side validation here
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address || !customerInfo.city || !customerInfo.zipCode) {
      toast.error('Please fill in all customer information fields.');
      return;
    }

    if (!cart || cart.length === 0) {
        toast.error('Your cart is empty. Please add items before checking out.');
        return;
    }

    setLoading(true)
    
    try {
      // Simulate marketplace payment processing
      const response = await processMarketplacePayment(cart, user?.id);

      if (response.success) {
        toast.success(response.message + ' Order placed.')
        clearCart()
        // In a real app, you'd likely redirect to an order confirmation page
      } else {
        toast.error(response.message || 'Payment failed. Please try again.')
      }
      
    } catch (error) {
      toast.error('An unexpected error occurred during payment. Please try again.')
      console.error('Payment processing error:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={customerInfo.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerInfo.email}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={customerInfo.address}
        onChange={handleInputChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={customerInfo.city}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={customerInfo.zipCode}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Replaced CardElement with a message for mock payments */}
      <div className="p-4 border border-gray-300 rounded-lg text-center text-gray-600">
        Payment Gateway Integration (Mock) - Using simulated payment
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total: ${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading} // Changed to only disable on loading, as stripe/elements are not used for disabled state
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Place Order & Pay ${total.toFixed(2)}`}
      </button>
    </form>
  )
}

export default CheckoutForm