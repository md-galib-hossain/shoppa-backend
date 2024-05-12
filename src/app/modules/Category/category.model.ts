import { Schema, model } from "mongoose";
import { CategoryModel, SubCategoryModel, TCategory, TSubCategory } from "./category.interface";

const categorySchema = new Schema<TCategory,CategoryModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  image : {
    type : String,
    required: [true, "Image is required"],

  }
 
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
});
categorySchema.statics.isCategoryExists = async function (id:string){
    const existingCategory = await Category.findOne({_id : id})
    return existingCategory
}


export const Category = model<TCategory,CategoryModel>("Category", categorySchema);


//*sub category*//
const subCategorySchema = new Schema<TSubCategory,SubCategoryModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  image : {
    type : String,
    required: [true, "Image is required"],

  },
  categoryId : {
    type: Schema.Types.ObjectId,
    required: [true, "Category Id is required"],
    ref: "Category",
  }
 
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
subCategorySchema.statics.isSubCategoryExists = async function (id:string){
    const existingSubCategory = await Category.findOne({_id : id})
    return existingSubCategory
}


export const SubCategory = model<TSubCategory,SubCategoryModel>("Subcategory", subCategorySchema);