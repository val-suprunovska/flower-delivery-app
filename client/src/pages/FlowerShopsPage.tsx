import React, { useState, useEffect } from 'react';
import type { Product, Shop } from '../types';
import { shopAPI, productAPI, type ProductsQueryParams } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

export const FlowerShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedShop, setSelectedShop] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price' | 'date' | 'favorite'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const loadShops = async () => {
      try {
        const response = await shopAPI.getShops();
        setShops(response.data);
      } catch (error) {
        console.error('Error loading shops:', error);
      }
    };

    loadShops();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const params: ProductsQueryParams = { sortBy, sortOrder };
        if (selectedShop) params.shopId = selectedShop;
        
        const response = await productAPI.getProducts(params);
        setProducts(response.data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, [selectedShop, sortBy, sortOrder, refreshTrigger]);

  const handleFavoriteToggle = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Flower Shops</h1>
      
      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="">All Shops</option>
          {shops.map(shop => (
            <option key={shop._id} value={shop._id}>{shop.name}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'date' | 'favorite')}
          className="border rounded-xl px-3 py-2"
        >
          <option value="favorite">Favorites First</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="border rounded-xl px-3 py-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={addToCart}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};