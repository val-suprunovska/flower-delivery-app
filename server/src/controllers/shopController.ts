import { Request, Response } from 'express';
import Shop from '../models/Shop.model';

export const getShops = async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error });
  }
};