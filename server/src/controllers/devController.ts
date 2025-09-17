import { Request, Response } from 'express';
import Shop from '../models/Shop.model';
import Product from '../models/Product.model';

// Создать магазин
export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, rating, image } = req.body;
    
    const shop = await Shop.create({
      name,
      address,
      phone,
      rating: rating || 4.5,
      image
    });

    res.status(201).json({
      message: 'Shop created successfully',
      shop
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating shop', error });
  }
};

// Создать товар
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, category, isFavorite, shopId } = req.body;
    
    // Проверяем существование магазина
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      isFavorite: isFavorite || false,
      shop: shopId
    });

    // Популируем данные о магазине
    await product.populate('shop');

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Создать несколько тестовых данных
export const createSampleData = async (req: Request, res: Response) => {
  try {
    // Очищаем существующие данные
    await Shop.deleteMany({});
    await Product.deleteMany({});

    // Создаем магазины
    const shop1 = await Shop.create({
      name: "Blooming Paradise",
      address: "123 Flower Street, City Center",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop"
    });

    const shop2 = await Shop.create({
      name: "Petals & Stems",
      address: "456 Garden Avenue, Downtown",
      phone: "+1 (555) 987-6543",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop"
    });

    const shop3 = await Shop.create({
      name: "Eternal Blossoms",
      address: "789 Rose Boulevard, West District",
      phone: "+1 (555) 456-7890",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=300&fit=crop"
    });

    // Создаем товары
    const products = await Product.insertMany([
      {
        name: "Roses Bouquet",
        price: 45.99,
        description: "Beautiful bouquet of 12 fresh roses, perfect for romantic occasions.",
        image: "https://klever-flowers.com/files/product/6/316/316_s.jpg",
        category: "bouquet",
        isFavorite: true,
        shop: shop1._id,
        createdAt: new Date('2024-01-15')
      },
      {
        name: "White Lilies",
        price: 42.75,
        description: "Pure white lilies that symbolize purity and beauty, great for special occasions.",
        image: "https://kvitka.od.ua/image/cache/webp/catalog/new/05002-290x290.webp",
        category: "bouquet",
        isFavorite: true,
        shop: shop2._id,
        createdAt: new Date('2024-01-12')
      },
      {
        name: "Premium Rose Collection",
        price: 89.99,
        description: "Luxurious collection of 24 premium roses in various colors with premium packaging.",
        image: "https://klever-flowers.com/files/product/1/601/601_s.jpg",
        category: "bouquet",
        isFavorite: true,
        shop: shop3._id,
        createdAt: new Date('2024-01-05')
      }
    ]);

    res.json({
      message: 'Sample data created successfully',
      shops: [shop1, shop2, shop3],
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sample data', error });
  }
};

// Очистить все данные
export const clearAllData = async (req: Request, res: Response) => {
  try {
    await Shop.deleteMany({});
    await Product.deleteMany({});
    res.json({ message: 'All data cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing data', error });
  }
};