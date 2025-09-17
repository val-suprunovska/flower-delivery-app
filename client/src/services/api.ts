import axios from 'axios';
import type { Product, Shop, Order } from '../types';

const API_BASE_URL = import.meta.env.PROD 
  ? `${import.meta.env.VITE_API_URL}/api`
  : import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface ProductsQueryParams {
  sortBy?: 'price' | 'date' | 'favorite';
  sortOrder?: 'asc' | 'desc';
  shopId?: string;
}

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  timezone: string;
}

export const shopAPI = {
  getShops: () => api.get<Shop[]>('/shops'),
};

export const productAPI = {
  getProducts: (params?: ProductsQueryParams) => api.get<Product[]>('/products', { params }),
  toggleFavorite: (productId: string) => api.patch(`/products/${productId}/favorite`),
};

export const orderAPI = {
  createOrder: (orderData: CreateOrderData) => api.post<Order>('/orders', orderData),
  getOrder: (orderId: string) => api.get<Order>(`/orders/${orderId}`),
};