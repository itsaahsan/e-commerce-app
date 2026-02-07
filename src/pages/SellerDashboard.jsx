import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../store/useStore';
import { Trash2, Edit } from 'lucide-react';
import ProductForm from '../components/ProductForm';

const SellerDashboard = () => {
  const { user } = useAuth();
  const { 
    getProductsBySeller, 
    deleteProduct, 
    addProduct, 
    updateProduct,
    getOrdersBySeller 
  } = useStore();

  const sellerProducts = getProductsBySeller(user.id);
  const sellerOrders = getOrdersBySeller(user.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleFormSubmit = (productData) => {
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
        sellerId: user.id,
        rating: 0,
        reviews: 0,
        inStock: true,
      });
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">${parseFloat(product.price).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Items</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {sellerOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b">#{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.date}</td>
                  <td className="py-2 px-4 border-b">
                    {order.items.map(item => (
                      <div key={item.productId}>
                        {useStore.getState().products.find(p => p.id === item.productId)?.name} ({item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
