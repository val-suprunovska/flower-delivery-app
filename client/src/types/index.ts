export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'bouquet' | 'flower';
  isFavorite: boolean;
  shop: Shop;
  createdAt: string;
}

export interface Shop {
  _id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  orderDate: string;
  timezone: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}