import express from 'express';
import { getShops } from '../controllers/shopController';
import { getProducts, toggleFavorite } from '../controllers/productController';
import { createOrder, getOrder } from '../controllers/orderController';
import { createShop, createProduct, createSampleData, clearAllData } from '../controllers/devController';

const router = express.Router();

// Dev routes (для добавления данных через Postman)
router.post('/dev/shops', createShop);
router.post('/dev/products', createProduct);
router.post('/dev/sample-data', createSampleData);
router.delete('/dev/clear-data', clearAllData);

// Основные роуты
router.get('/shops', getShops);
router.get('/products', getProducts);
router.patch('/products/:productId/favorite', toggleFavorite);
router.post('/orders', createOrder);
router.get('/orders/:orderId', getOrder);

export default router;