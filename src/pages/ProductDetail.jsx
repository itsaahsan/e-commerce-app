import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Share2, Scale } from 'lucide-react'
import { useStore } from '../store/useStore'
import ProductReviews from '../components/ProductReviews'
import RecommendedProducts from '../components/RecommendedProducts'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const { products, addToCart, addToWishlist, addToCompare, addToRecentlyViewed } = useStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find(p => p.id === parseInt(id))
  
  useEffect(() => {
    // Add product to recently viewed when component mounts
    if (product) {
      addToRecentlyViewed(product)
    }
  }, [product, addToRecentlyViewed])
  
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  const images = [product.image, product.image, product.image] // Mock multiple images

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleAddToWishlist = () => {
    addToWishlist(product)
    toast.success('Added to wishlist!')
  }

  const handleAddToCompare = () => {
    addToCompare(product)
    toast.success('Added to comparison!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Product link copied!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-primary mb-4">${product.price}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="font-medium">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            
            <button
              onClick={handleAddToWishlist}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleAddToCompare}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Scale className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleShare}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Category: {product.category}</li>
              <li>• Free shipping on orders over $50</li>
              <li>• 30-day return policy</li>
              <li>• 1-year warranty included</li>
            </ul>
          </div>
        </div>
      </div>

      <ProductReviews productId={product.id} />
      <RecommendedProducts currentProductId={product.id} />
    </div>
  )
}

export default ProductDetail