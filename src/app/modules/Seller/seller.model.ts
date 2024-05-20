import { Schema, model } from "mongoose";
import { userStatusARR } from "../User/user.constant";
import { TSeller } from "./seller.interface";

//* Sub schemas *//
const bankInfoSchema = new Schema(
  {
    accountTitle: { type: String },
    accountNumber: { type: String },
    bankName: { type: String },
    branchName: { type: String },
    routingNumber: { type: String },
    chequeImg: { type: String },
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    address: { type: String },
    country: { type: String },
    division: { type: String },
    city: { type: String },
    postCode: { type: String },
  },
  { _id: false }
);

const nidInfoSchema = new Schema(
  {
    idType: { type: String, enum: ["NID", "PASSPORT"] },
    fullName: { type: String, },
    idNo: { type: String },
    idFrontImg: { type: String },
    idBackImg: { type: String },
    isDeleted: { type: Boolean },
    status: {
      type: String,
      enum: ["VERIFIED", "UNVERIFIED", "PENDING"],
      default: "UNVERIFIED",
    },
  },
  { _id: false }
);

//* Sub schemas *//

const sellerSchema = new Schema<TSeller>(
  {
    bankInfo: bankInfoSchema,
    shopName: { type: String, required: true },
    warehouseAddressInfo: addressSchema,
    businessAddressInfo: addressSchema,
    returnAddressInfo: addressSchema,
    nidInfo: nidInfoSchema,
    accountType: {
      type: String,
      enum: ["INDIVIDUAL", "BUSINESS"],
      required: true,
    },
    age: {
      type: Number,
      default: 18,
      validate: {
        validator: function (value: any) {
          return value >= 18;
        },
        message: (props) =>
          `${props.value} is less than the minimum allowed age of 18`,
      },
    },
    sellerType: { type: String, enum: ["LOCAL", "GLOBAL"], required: true },

    profileImg: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["VERIFIED", "UNVERIFIED", "BANNED"],
      default : "UNVERIFIED",
    },
  },
  {
    timestamps: true,
  }
);

export const Seller = model<TSeller>("Seller", sellerSchema);
