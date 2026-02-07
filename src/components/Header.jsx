import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Heart, User, Package, Scale, LogOut, ClipboardList, Grid, LayoutGrid, Building } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useAuth } from '../contexts/AuthContext'
import Logo from './Logo'

const Header = () => {
  const { cart, searchTerm, setSearchTerm, getCartItemsCount, compareList } = useStore()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const cartItemsCount = getCartItemsCount()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-gradient-to-r from-primary to-primary-light/90 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <Link to="/" className="flex items-center group">
            <Logo className="mr-2 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-2xl font-bold text-white drop-shadow-lg">ShopHub</span>
          </Link>

          {/* Search Bar */}
          <div className="w-full md:w-1/3 lg:w-1/2 max-w-xl mx-0 md:mx-4 order-3 md:order-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Search is automatically performed as the user types
                    // This is handled by the store's filtering mechanism
                  }
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border border-white/30"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 order-2 md:order-3">
            <Link to="/categories" className="text-white hover:text-accent transition-all duration-300 hover:scale-110" title="Categories">
              <Grid className="w-6 h-6" />
            </Link>

            <Link to="/compare" className="text-white hover:text-accent relative transition-all duration-300 hover:scale-110">
              <Scale className="w-6 h-6" />
              {compareList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link to="/order-tracking" className="text-white hover:text-accent transition-all duration-300 hover:scale-110">
              <Package className="w-6 h-6" />
            </Link>

            <Link to="/wishlist" className="text-white hover:text-accent transition-all duration-300 hover:scale-110">
              <Heart className="w-6 h-6" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-white hover:text-accent transition-all duration-300 hover:scale-110" title="Admin Dashboard">
                    <LayoutGrid className="w-6 h-6" />
                  </Link>
                )}
                {(user.role === 'seller' || user.role === 'admin') && (
                  <Link to="/seller" className="text-white hover:text-accent transition-all duration-300 hover:scale-110" title="Seller Dashboard">
                    <Building className="w-6 h-6" />
                  </Link>
                )}
                <Link to="/order-history" className="text-white hover:text-accent transition-all duration-300 hover:scale-110" title="Order History">
                  <ClipboardList className="w-6 h-6" />
                </Link>
                <Link to="/profile" className="text-white hover:text-accent flex items-center transition-all duration-300 hover:scale-105">
                  <User className="w-6 h-6" />
                  <span className="ml-1 hidden md:inline font-medium">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-accent transition-all duration-300 hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-white hover:text-accent transition-all duration-300 hover:scale-110">
                  <User className="w-6 h-6" />
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative text-white hover:text-accent transition-all duration-300 hover:scale-110">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
