import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDb = async (payload: TCategory) => {
 
  const result = await Category.create(payload);
  return result;
};
const createSubCategoryIntoDb = async (payload: any) => {
  return payload;
};

export const CategoryServices = {
  createCategoryIntoDb,
  createSubCategoryIntoDb,
};
