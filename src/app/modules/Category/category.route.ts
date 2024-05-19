import express from "express";
import { CategoryControllers } from "./category.controller";
import { CategoryValidations } from "./category.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

//*categories*//
router.post(
  "/",
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory
);
router.get("/", CategoryControllers.getAllCategory);
router.get("/:categoryId", CategoryControllers.getSingleCategory);
router.patch("/:categoryId",validateRequest(CategoryValidations.updateCategoryValidationSchema), CategoryControllers.updateCategory);
router.delete("/:categoryId", CategoryControllers.deleteSingleCategory);
//*Sub categories*//
router.post(
  "/subcategories",
  validateRequest(CategoryValidations.createSubCategoryValidationSchema),
  CategoryControllers.createSubCategory
);
router.get("/subcategories/all", CategoryControllers.getAllSubCategory);
router.get(
  "/subcategories/:subCategoryId",
  CategoryControllers.getSingleSubCategory
);

router.patch(
    "/subcategories/:subCategoryId",validateRequest(CategoryValidations.updateSubCategoryValidationSchema),
    CategoryControllers.updateSubCategory
  );
router.delete(
  "/subcategories/:subCategoryId",
  CategoryControllers.deleteSingleSubCategory
);

export const CategoryRoutes = router;
