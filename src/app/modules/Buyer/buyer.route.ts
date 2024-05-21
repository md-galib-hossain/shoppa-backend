import express from 'express'
import { BuyerControllers } from './buyer.controller';

const router = express.Router()

router.get(
    '/',
    BuyerControllers.getAllBuyers,
  );
router.delete(
    '/:id',
    BuyerControllers.softDeleteBuyer,
  );

  export const BuyerRoutes = router