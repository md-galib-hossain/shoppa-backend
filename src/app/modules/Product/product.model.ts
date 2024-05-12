import { Schema, model } from "mongoose";
import { ProductModel, TProduct } from "./product.interface";
import { Status } from "./product.constant";

const productSchema = new Schema<TProduct,ProductModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  images: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    default: Status[1],
    enum: {
      values: Status,
      message: "{VALUE} is not a valid status",
    },
  },
  isCod: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, "Category Id is required"],
    ref: "Category",
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    required: [true, "Seller Id is required"],
    ref: "Seller",
  },
});

productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
});
productSchema.statics.isProductExists = async function (id:string){
    const existingProduct = await Product.findOne({_id : id})
    return existingProduct
}


export const Product = model<TProduct,ProductModel>("Product", productSchema);
