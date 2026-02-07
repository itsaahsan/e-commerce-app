import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LiveChat from './components/LiveChat'
import OrderTracking from './components/OrderTracking'
import CompareProducts from './components/CompareProducts'
import ProductDetail from './pages/ProductDetail'
import OrderHistoryPage from './pages/OrderHistory'
import CategoriesPage from './pages/Categories'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import SellerDashboard from './pages/SellerDashboard'

function App() {
  // Add error boundary for the entire app
  try {
    return (
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/compare" element={<CompareProducts />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/order-history" element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                } />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/admin" element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/seller" element={
                  <ProtectedRoute roles={['seller', 'admin']}>
                    <SellerDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
            <LiveChat />
          </div>
        </Router>
      </AuthProvider>
    )
  } catch (error) {
    console.error('Error rendering App:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-700 mb-4">Something went wrong while loading the application.</p>
          <p className="text-sm text-gray-500">Check the console for more details.</p>
        </div>
      </div>
    )
  }
}

export default App
