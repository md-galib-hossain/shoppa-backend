import { z } from "zod";

 const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
    image: z.string({ required_error: "Image is required" }),
    isDeleted: z.boolean().optional(),
  }),
});
 const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3).optional(),
    image: z.string({ required_error: "Image is required" }).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

 const createSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
    image: z.string({ required_error: "Image is required" }),
    isDeleted: z.boolean().optional(),
    categoryId: z.string({ required_error: "CategoryId is required" }),
  }),
});
const updateSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3).optional(),
    image: z.string({ required_error: "Image is required" }).optional(),
    isDeleted: z.boolean().optional(),
    categoryId: z.string({ required_error: "CategoryId is required" }).optional(),
  }),
});
export const CategoryValidations = {
  createCategoryValidationSchema,
  createSubCategoryValidationSchema,updateCategoryValidationSchema,updateSubCategoryValidationSchema
};
