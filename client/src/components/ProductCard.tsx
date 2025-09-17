import React, { useState } from 'react';
import type { Product } from '../types';
import { productAPI } from '../services/api';
import { HeartIcon as Heart1 } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onFavoriteToggle?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onFavoriteToggle 
}) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [isAdding, setIsAdding] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      await productAPI.toggleFavorite(product._id);
      setIsFavorite(!isFavorite);
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-88 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <button
            onClick={handleFavoriteToggle}
            className="text-gray-400 hover:text-red-400 transition-colors p-1"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <HeartIcon className='h-5 w-5 text-red-400'/> : <Heart1 className='h-5 w-5'/>}
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`bg-gray-950 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2 ${
              isAdding ? 'opacity-50' : ''
            }`}
          >
            {isAdding ? '✓' : '+'} add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};