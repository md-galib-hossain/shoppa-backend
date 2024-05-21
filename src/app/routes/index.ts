import { Router } from "express";
import { ProductRoutes } from "../modules/Product/product.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { UserRoutes } from "../modules/User/user.route";
import { SellerRoutes } from "../modules/Seller/seller.route";
import { BuyerRoutes } from "../modules/Buyer/buyer.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/sellers",
    route: SellerRoutes,
  },
  {
    path: "/buyers",
    route: BuyerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
