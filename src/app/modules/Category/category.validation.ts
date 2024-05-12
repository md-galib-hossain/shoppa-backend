import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
    image: z.string({ required_error: "Image is required" }),
    isDeleted: z.boolean().optional(),
  }),
});

export const createSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
    image: z.string({ required_error: "Image is required" }),
    isDeleted: z.boolean().optional(),
    categoryId: z.string({ required_error: "CategoryId is required" }),
  }),
});
export const CategoryValidations = {
  createCategoryValidationSchema,
  createSubCategoryValidationSchema,
};
