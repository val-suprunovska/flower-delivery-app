import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  orderId: string;
  items: IOrderItem[];
  totalAmount: number;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  orderDate: Date;
  timezone: string;
}

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  timezone: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IOrder>('Order', OrderSchema);