import { create } from 'zustand'

// Generate 500 products across different categories
const generateProducts = () => {
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive']
  const productNames = {
    Electronics: ['Wireless Headphones', 'Smartphone', 'Laptop', 'Tablet', 'Smart Watch', 'Bluetooth Speaker', 'Gaming Console', 'Camera', 'Smart TV', 'VR Headset', 'USB-C Cable', 'Power Bank', 'Wireless Mouse', 'Mechanical Keyboard', 'Monitor', 'Webcam', 'Microphone', 'Charger', 'Screen Protector', 'Phone Case'],
    Fashion: ['T-Shirt', 'Jeans', 'Sneakers', 'Jacket', 'Dress', 'Sunglasses', 'Backpack', 'Watch', 'Hat', 'Scarf', 'Sweater', 'Shorts', 'Boots', 'Socks', 'Belt', 'Tie', 'Gloves', 'Hoodie', 'Polo Shirt', 'Leggings'],
    'Home & Garden': ['Coffee Maker', 'Blender', 'Vacuum Cleaner', 'Air Purifier', 'Lamp', 'Plant Pot', 'Cushion', 'Blanket', 'Cookware Set', 'Garden Tools', 'Bed Sheet', 'Pillow', 'Towel', 'Rug', 'Mirror', 'Shelf', 'Desk', 'Chair', 'Table', 'Door Mat'],
    Sports: ['Yoga Mat', 'Dumbbells', 'Running Shoes', 'Basketball', 'Tennis Racket', 'Swimming Goggles', 'Fitness Tracker', 'Water Bottle', 'Sports Bag', 'Resistance Bands', 'Jump Rope', 'Kettlebell', 'Foam Roller', 'Gym Gloves', 'Headband', 'Wrist Wrap', 'Shin Guard', 'Knee Pad', 'Elbow Pad', 'Skipping Rope'],
    Books: ['Fiction Novel', 'Non-Fiction Book', 'Biography', 'Cookbook', 'Self-Help Book', 'Science Book', 'History Book', 'Art Book', 'Children Book', 'Poetry Collection', 'Mystery Novel', 'Romance Novel', 'Fantasy Book', 'Thriller', 'Comic Book', 'Graphic Novel', 'Travel Guide', 'Business Book', 'Philosophy Book', 'Educational Book'],
    Beauty: ['Face Cream', 'Lipstick', 'Shampoo', 'Perfume', 'Makeup Kit', 'Skincare Set', 'Hair Dryer', 'Nail Polish', 'Face Mask', 'Body Lotion', 'Conditioner', 'Face Wash', 'Moisturizer', 'Sunscreen', 'Serum', 'Toner', 'Cleanser', 'Exfoliator', 'Eye Cream', 'Lip Balm'],
    Toys: ['Action Figure', 'Board Game', 'Puzzle', 'RC Car', 'Doll', 'Building Blocks', 'Stuffed Animal', 'Musical Instrument', 'Art Supplies', 'Educational Toy', 'Video Game', 'Trading Card', 'Model Kit', 'Toy Car', 'Toy Train', 'Kite', 'Yo-Yo', 'Frisbee', 'Skateboard', 'Scooter'],
    Automotive: ['Car Charger', 'Seat Cover', 'Floor Mat', 'Steering Wheel Cover', 'Car Air Freshener', 'Tire Pressure Gauge', 'Jump Starter', 'Car Vacuum', 'Phone Mount', 'Dash Cam', 'Car Organizer', 'Windshield Shade', 'Car Wax', 'Air Filter', 'Oil Filter', 'Brake Pad', 'Spark Plug', 'Battery', 'Jumper Cable', 'Car Cover']
  }
  
  const adjectives = ['Premium', 'Deluxe', 'Pro', 'Smart', 'Eco', 'Organic', 'Luxury', 'Classic', 'Modern', 'Stylish', 'Advanced', 'Professional', 'Ultra', 'Super', 'Elite']
  
  const products = []
  
  for (let i = 1; i <= 500; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const productNameBase = productNames[category][Math.floor(Math.random() * productNames[category].length)]
    const productName = Math.random() > 0.6 
      ? `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${productNameBase}` 
      : productNameBase
    
    const basePrice = parseFloat((Math.random() * 500 + 10).toFixed(2))
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 40) + 5 : 0
    const discountedPrice = discount > 0 ? parseFloat((basePrice * (1 - discount / 100)).toFixed(2)) : basePrice
    
    products.push({
      id: i,
      name: productName,
      price: discountedPrice,
      originalPrice: basePrice,
      discount: discount,
      category: category,
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      reviews: Math.floor(Math.random() * 500),
      stock: Math.floor(Math.random() * 100) + 1,
      description: `High-quality ${productName.toLowerCase()} in the ${category} category. Perfect for everyday use.`,
      shipping: Math.random() > 0.5 ? 'Free Shipping' : `$${Math.floor(Math.random() * 20) + 5}`,
      inStock: Math.random() > 0.1
    })
  }
  
  return products
}

export const useStore = create((set, get) => ({
  // Products
  products: generateProducts(),

  // Cart
  cart: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id)
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] }
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),

  clearCart: () => set({ cart: [] }),

  // User
  user: null,
  setUser: (user) => set({ user }),

  // Filters
  searchTerm: '',
  selectedCategory: 'All',
  priceRange: { min: 0, max: 1000 },
  ratingFilter: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setRatingFilter: (rating) => set({ ratingFilter: rating }),

  // Wishlist
  wishlist: [],
  addToWishlist: (product) => set((state) => ({
    wishlist: [...state.wishlist, product]
  })),
  removeFromWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.filter(item => item.id !== productId)
  })),

  // Compare Products
  compareList: [],
  addToCompare: (product) => set((state) => {
    if (state.compareList.length >= 4) return state
    if (state.compareList.some(item => item.id === product.id)) return state
    return { compareList: [...state.compareList, product] }
  }),
  removeFromCompare: (productId) => set((state) => ({
    compareList: state.compareList.filter(item => item.id !== productId)
  })),

  // Recently Viewed
  recentlyViewed: [],
  addToRecentlyViewed: (product) => set((state) => {
    const filtered = state.recentlyViewed.filter(item => item.id !== product.id)
    return { recentlyViewed: [product, ...filtered].slice(0, 10) }
  }),

  // Coupons
  appliedCoupon: null,
  applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
  removeCoupon: () => set({ appliedCoupon: null }),

  // Getters
  getCartTotal: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getCartItemsCount: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },

  getFilteredProducts: () => {
    const { products, searchTerm, selectedCategory, priceRange, ratingFilter } = get()
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      const matchesRating = ratingFilter ? product.rating >= ratingFilter : true
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })
  }
}))
