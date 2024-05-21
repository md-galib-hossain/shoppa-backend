import express from 'express'
import { SellerControllers } from './seller.controller';

const router = express.Router()

router.get(
  '/',
  SellerControllers.getAllSellers,
);
router.delete(
    '/:id',
    SellerControllers.softDeleteSeller,
  );

  export const SellerRoutes = router