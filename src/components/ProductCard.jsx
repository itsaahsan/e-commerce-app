import React from 'react'
import { Star, Heart, ShoppingCart, Truck } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useStore()
  const isInWishlist = wishlist.some(item => item.id === product.id)

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Out of stock!')
      return
    }
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.category}</p>
          </div>
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full ml-2 ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            } hover:bg-red-500 hover:text-white transition-colors`}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
        
        {product.discount > 0 && (
          <div className="mb-2 inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews})
          </span>
        </div>
        
        <div className="mb-2 text-xs text-gray-500">
          Stock: {product.stock} | {product.inStock ? <span className="text-green-600">In Stock</span> : <span className="text-red-600">Out of Stock</span>}
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Truck className="w-4 h-4 text-gray-600" />
          <span className="text-gray-600">{product.shipping}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
            product.inStock
              ? 'bg-primary text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
