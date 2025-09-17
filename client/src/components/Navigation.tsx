import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { BuildingStorefrontIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export const Navigation: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <img src='./public/logo.svg'/>
            Flower Delivery
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-gray-400 transition-colors"
            >
              <BuildingStorefrontIcon className='h-7 w-7'/>
            </Link>
            
            <Link
              to="/cart"
              className="relative hover:text-gray-400 transition-colors"
            >
              <ShoppingCartIcon className='h-7 w-7'/>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};