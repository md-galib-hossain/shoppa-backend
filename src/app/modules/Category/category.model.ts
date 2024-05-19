import { Schema, model } from "mongoose";
import {
  CategoryModel,
  SubCategoryModel,
  TCategory,
  TSubCategory,
} from "./category.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const categorySchema = new Schema<TCategory, CategoryModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

categorySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  
  next();
});
categorySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
  next()
});

// Pre-save hook to sanitize the category name
categorySchema.pre("save", async function (next) {
  // this.name = this.name.replace(/\s+/g, "").toLowerCase();
  const result = await Category.findOne({ name: this.name });
  if (result) {
    throw new AppError(httpStatus.NOT_FOUND, "Same category already exists!!");
  }
  next();
});

categorySchema.statics.isCategoryExists = async function (id: string) {
  const existingCategory = await Category.findOne({ _id: id });
  return existingCategory;
};
categorySchema.statics.isCategoryExistsByName = async function (name: string) {
  const existingCategory = await Category.findOne({ name });
  if (existingCategory?.name) {
    return true;
  }
};

export const Category = model<TCategory, CategoryModel>(
  "Category",
  categorySchema
);

//*sub category*//
const subCategorySchema = new Schema<TSubCategory, SubCategoryModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique : true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, "Category Id is required"],
    ref: "Category",
  },
});

subCategorySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
subCategorySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
subCategorySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
});
subCategorySchema.statics.isSubCategoryExists = async function (id: string) {
  const existingSubCategory = await SubCategory.findOne({ _id: id }).populate('categoryId');
  return existingSubCategory;
};
// Pre-save hook to sanitize the sub category name
subCategorySchema.pre("save", async function (next) {
  // this.name = this.name.replace(/\s+/g, "").toLowerCase();
  const result = await SubCategory.findOne({ name: this.name });
  if (result) {
    throw new AppError(httpStatus.NOT_FOUND, "Same sub category already exists!!");
  }
  next();
});

export const SubCategory = model<TSubCategory, SubCategoryModel>(
  "Subcategory",
  subCategorySchema
);
