import React from 'react';
import type { Product } from '../types';
import { productAPI } from '../services/api';
import { HeartIcon as Heart1 } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleFavoriteToggle = async () => {
    try {
      await productAPI.toggleFavorite(product._id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button
            onClick={handleFavoriteToggle}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            {product.isFavorite ? <HeartIcon className='h-5 w-5 text-red-400'/> : <Heart1 className='h-5 w-5'/>}
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gray-950 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors"
          >
            add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};