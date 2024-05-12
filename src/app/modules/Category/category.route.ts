import express from 'express'
import { CategoryControllers } from './category.controller'
import { CategoryValidations } from './category.validation'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()


//*categories*//
router.post("/",validateRequest(CategoryValidations.createCategoryValidationSchema),CategoryControllers.createCategory)
//*Sub categories*//
router.post("/subcategories/",CategoryControllers.createSubCategory)

export const CategoryRoutes = router