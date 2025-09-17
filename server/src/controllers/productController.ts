import { Request, Response } from 'express';
import Product from '../models/Product.model';

interface GetProductsQuery {
  sortBy?: 'price' | 'date' | 'favorite';
  sortOrder?: 'asc' | 'desc';
  shopId?: string;
}

export const getProducts = async (req: Request<{}, {}, {}, GetProductsQuery>, res: Response) => {
  try {
    const { sortBy, sortOrder, shopId } = req.query;
    
    let query: Record<string, unknown> = {};
    if (shopId) query.shop = shopId;

    let sortOptions: Record<string, 1 | -1> = {};
    
    switch (sortBy) {
      case 'price':
        sortOptions.price = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'date':
        sortOptions.createdAt = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'favorite':
        sortOptions.isFavorite = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const products = await Product.find(query)
      .populate('shop')
      .sort(sortOptions);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isFavorite = !product.isFavorite;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite', error });
  }
};