import mongoose, { Schema, Document } from 'mongoose';

export interface IShop extends Document {
  name: string;
  address: string;
  phone: string;
  rating: number;
}

const ShopSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IShop>('Shop', ShopSchema);