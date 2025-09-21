import React from 'react'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useStore()
  const isInWishlist = wishlist.some(item => item.id === product.id)

  const handleAddToCart = () => {
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
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:bg-red-500 hover:text-white transition-colors`}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        
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
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard