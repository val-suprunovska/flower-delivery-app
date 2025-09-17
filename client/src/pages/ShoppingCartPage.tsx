import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { orderAPI, type CreateOrderData } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

export const ShoppingCartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const orderData: CreateOrderData = {
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        timezone
      };

      const response = await orderAPI.createOrder(orderData);
      clearCart();
      navigate(`/order/${response.data.orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-4">Add some beautiful flowers to your cart!</p>
        <Link 
          to="/" 
          className="bg-gray-950 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors inline-block"
        >
          Browse Flowers
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div>
          {cart.map(item => (
            <div key={item.productId} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-green-600 font-bold">${item.product.price}</p>
                  <p className="text-sm text-gray-600 line-clamp-1">{item.product.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="ml-4 text-gray-500 hover:text-red-700 transition-colors p-1"
                  >
                    <TrashIcon className='h-6 w-6'/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-right text-2xl font-bold mt-4 p-4 bg-gray-100 rounded-lg">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-950"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-950"
                placeholder="+380 (98) 765-4321"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Address *</label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-950"
                rows={3}
                placeholder="123 Street Name, City"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-950 text-white py-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isSubmitting ? 'Processing...' : `Place Order - $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};