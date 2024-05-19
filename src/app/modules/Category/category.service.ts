import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory, TSubCategory } from "./category.interface";
import { Category, SubCategory } from "./category.model";

const createCategoryIntoDb = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDb = async () => {
  const result = await Category.find();
  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await Category.isCategoryExists(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No category found");
  }
  return result;
};
const updateSingleCategory = async (id: string,payload: Partial<TCategory>) => {
  const exists = await Category.isCategoryExists(id);
  if (!exists) {
    throw new AppError(httpStatus.NOT_FOUND, "No category found");
  }
  const result = await Category.updateOne({_id : id}, payload)
  return result;
};
const deleteSingleCategory = async (id: string) => {
  const exists = await Category.isCategoryExists(id);
  if (!exists) {
    throw new AppError(httpStatus.NOT_FOUND, "No category found");
  }
  const result = await Category.findByIdAndUpdate(
    {_id :id},
    { isDeleted: true },
    { new: true }
  );
  return result
};

//*sub-category*//
const createSubCategoryIntoDb = async (payload: TSubCategory) => {
  const result = await SubCategory.create(payload);
  return result;
};

const getAllSubCategoryFromDb = async () => {
  const result = await SubCategory.find().populate('categoryId');
  return result;
};

const getSingleSubCategory = async (id: string) => {
  const result = await SubCategory.isSubCategoryExists(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Sub category found");
  }
  return result;
};
const deleteSingleSubCategory = async (id: string) => {
  const exists = await SubCategory.isSubCategoryExists(id);
  if (!exists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Sub category found");
  }
  const result = await SubCategory.findByIdAndUpdate(
    {_id :id},
    { isDeleted: true },
    { new: true }
  );
  return result
};
const updateSingleSubCategory = async (id: string,payload: Partial<TSubCategory>) => {
  const exists = await SubCategory.isSubCategoryExists(id);
  if (!exists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Sub category found");
  }
  const result = await SubCategory.updateOne({_id : id}, payload)
  return result;
};

export const CategoryServices = {
  createCategoryIntoDb,
  getAllCategoryFromDb,
  createSubCategoryIntoDb,
  getSingleCategory,
  getAllSubCategoryFromDb,
  getSingleSubCategory,updateSingleSubCategory,deleteSingleCategory,deleteSingleSubCategory,updateSingleCategory
};
