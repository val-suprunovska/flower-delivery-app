import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Order } from '../types';
import { orderAPI } from '../services/api';

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId]);

  const loadOrder = async (id: string) => {
    try {
      const response = await orderAPI.getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!order) {
    return <div className="container mx-auto px-4 py-8">Order not found</div>;
  }

  const orderDate = new Date(order.orderDate).toLocaleString('en-US', {
    timeZone: order.timezone,
    dateStyle: 'full',
    timeStyle: 'short'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Order Date:</strong> {orderDate}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>Address:</strong> {order.deliveryAddress}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-2xl font-bold text-right">
            Total: ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};