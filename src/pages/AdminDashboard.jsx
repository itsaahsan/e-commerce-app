import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Users, ShoppingBag, DollarSign, Trash2, Edit } from 'lucide-react';
import ProductForm from '../components/ProductForm';

const AdminDashboard = () => {
  const {
    users,
    products,
    orders,
    deleteUser,
    updateUserRole,
    deleteProduct,
    addProduct,
    updateProduct,
    getUserById,
    updateOrderStatus
  } = useStore(state => ({
    users: state.users,
    products: state.products,
    orders: state.orders,
    deleteUser: state.deleteUser,
    updateUserRole: state.updateUserRole,
    deleteProduct: state.deleteProduct,
    addProduct: state.addProduct,
    updateProduct: state.updateProduct,
    getUserById: state.getUserById,
    updateOrderStatus: state.updateOrderStatus
  }));

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleRoleChange = (userId, newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      updateUserRole(userId, newRole);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const handleOpenProductModal = (product = null) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(false);
  };

  const handleProductFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock, 10),
      });
    } else {
      addProduct({
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock, 10),
        sellerId: 101, // Default seller for admin added products, can be changed later
        rating: 0,
        reviews: 0,
        inStock: true,
      });
    }
    handleCloseProductModal();
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    if (window.confirm(`Are you sure you want to change the status of order ${orderId} to ${newStatus}?`)) {
      updateOrderStatus(orderId, newStatus);
    }
  };

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-blue-500 rounded-full p-3 mr-4">
            <Users className="text-white" />
          </div>
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-green-500 rounded-full p-3 mr-4">
            <ShoppingBag className="text-white" />
          </div>
          <div>
            <p className="text-gray-500">Total Products</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-yellow-500 rounded-full p-3 mr-4">
            <DollarSign className="text-white" />
          </div>
          <div>
            <p className="text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
          </div>
        </div>
         <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-indigo-500 rounded-full p-3 mr-4">
            <ShoppingBag className="text-white" />
          </div>
          <div>
            <p className="text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-1 rounded border"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product Management</h2>
          <button
            onClick={() => handleOpenProductModal()}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Add New Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Seller</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">
                    {getUserById(product.sellerId)?.name || `ID: ${product.sellerId}`}
                  </td>
                  <td className="py-2 px-4 border-b">${parseFloat(product.price).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenProductModal(product)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Buyer</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b">#{order.id}</td>
                  <td className="py-2 px-4 border-b">{getUserById(order.buyerId)?.name || `ID: ${order.buyerId}`}</td>
                  <td className="py-2 px-4 border-b">{order.date}</td>
                  <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={order.status}
                      onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                      className="p-1 rounded border"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* Add more actions if needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleProductFormSubmit}
              onCancel={handleCloseProductModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
