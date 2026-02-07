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
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer transform-gpu hover:-translate-y-2 flex flex-col h-full flex-grow relative overflow-visible">
      <div className="w-full h-48 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x600/EEE/31343C?text=${encodeURIComponent(product.name.substring(0, 20))}`;
          }}
        />
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10 animate-pulse">
            -{product.discount}%
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/70 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
      <div className="p-5 flex-grow flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors duration-300">{product.name}</h3>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="group-hover:text-primary transition-colors duration-300">{product.category}</span>
              <span className="group-hover:text-primary transition-colors duration-300">Seller: {product.sellerId}</span>
            </div>
          </div>
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full ml-2 transition-all duration-300 transform hover:scale-110 ${
              isInWishlist
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform duration-300 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{product.description}</p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-colors duration-300 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2 group-hover:text-primary transition-colors duration-300">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="mb-3 text-xs text-gray-500 flex justify-between group-hover:text-gray-600 transition-colors duration-300">
          <span>Stock: {product.stock}</span>
          <span className={product.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          <Truck className="w-4 h-4" />
          <span>{product.shipping}</span>
        </div>

        <div className="flex items-center justify-between mb-4 flex-grow">
          <div>
            <span className="text-2xl font-extrabold text-primary group-hover:text-accent transition-colors duration-300">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2 group-hover:text-gray-600 transition-colors duration-300">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`py-3 rounded-xl transition-all duration-500 flex items-center justify-center space-x-2 font-bold shadow-lg transform hover:shadow-xl ${
            product.inStock
              ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:from-primary-dark hover:to-primary-dark transform hover:scale-[1.03] active:scale-[0.98] hover:rotate-0.5'
              : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
