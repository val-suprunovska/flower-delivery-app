import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'bouquet' | 'flower';
  isFavorite: boolean;
  shop: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['bouquet', 'flower'], required: true },
  isFavorite: { type: Boolean, default: false },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', ProductSchema);