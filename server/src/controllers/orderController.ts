import { Request, Response } from 'express';
import Order from '../models/Order.model';
import Product from '../models/Product.model';

interface OrderItemRequest {
  productId: string;
  quantity: number;
}

interface CreateOrderRequest {
  items: OrderItemRequest[];
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  timezone: string;
}

const generateOrderId = () => {
  return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export const createOrder = async (req: Request<{}, {}, CreateOrderRequest>, res: Response) => {
  try {
    const { items, customerEmail, customerPhone, deliveryAddress, timezone } = req.body;

    // Calculate total amount and verify products
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = new Order({
      orderId: generateOrderId(),
      items: orderItems,
      totalAmount,
      customerEmail,
      customerPhone,
      deliveryAddress,
      timezone,
      orderDate: new Date()
    });

    await order.save();
    await order.populate('items.product');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId }).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};