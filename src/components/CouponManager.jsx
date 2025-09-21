import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Ticket, X } from 'lucide-react'

const CouponManager = () => {
  const { appliedCoupon, applyCoupon, removeCoupon, getCartTotal } = useStore()
  const [couponCode, setCouponCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Mock coupon data
  const coupons = {
    'SAVE10': { code: 'SAVE10', discount: 10, type: 'percentage', minAmount: 50 },
    'SAVE20': { code: 'SAVE20', discount: 20, type: 'percentage', minAmount: 100 },
    'FLAT50': { code: 'FLAT50', discount: 50, type: 'fixed', minAmount: 75 },
    'WELCOME': { code: 'WELCOME', discount: 15, type: 'percentage', minAmount: 0 }
  }

  const handleApplyCoupon = () => {
    setError('')
    setSuccess('')
    
    if (!couponCode.trim()) {
      setError('Please enter a coupon code')
      return
    }

    const coupon = coupons[couponCode.toUpperCase()]
    
    if (!coupon) {
      setError('Invalid coupon code')
      return
    }

    const cartTotal = getCartTotal()
    
    if (cartTotal < coupon.minAmount) {
      setError(`Minimum order amount of $${coupon.minAmount} required for this coupon`)
      return
    }

    applyCoupon(coupon)
    setSuccess(`Coupon applied! You saved $${calculateDiscount(coupon, cartTotal).toFixed(2)}`)
    setCouponCode('')
  }

  const calculateDiscount = (coupon, total) => {
    if (coupon.type === 'percentage') {
      return total * (coupon.discount / 100)
    } else {
      return Math.min(coupon.discount, total) // Can't discount more than the total
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setSuccess('Coupon removed')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyCoupon()
    }
  }

  const cartTotal = getCartTotal()
  const discount = appliedCoupon ? calculateDiscount(appliedCoupon, cartTotal) : 0
  const finalTotal = cartTotal - discount

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Ticket className="w-5 h-5 mr-2 text-primary" />
        Coupon Code
      </h3>
      
      {appliedCoupon ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-green-800">Coupon Applied: {appliedCoupon.code}</p>
              <p className="text-sm text-green-700">
                {appliedCoupon.type === 'percentage' 
                  ? `${appliedCoupon.discount}% off` 
                  : `$${appliedCoupon.discount} off`}
              </p>
            </div>
            <button 
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Apply
            </button>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <p>Try these codes:</p>
            <ul className="list-disc list-inside mt-1">
              <li>SAVE10 - 10% off orders $50+</li>
              <li>SAVE20 - 20% off orders $100+</li>
              <li>FLAT50 - $50 off orders $75+</li>
              <li>WELCOME - 15% off any order</li>
            </ul>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">
          {success}
        </div>
      )}
      
      {appliedCoupon && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1 text-green-600">
            <span>Discount ({appliedCoupon.code}):</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CouponManager
