import { Schema, model } from "mongoose";
import { TBuyer } from "./buyer.interface";
import { userStatusARR } from "../User/user.constant";

const buyerSchema = new Schema<TBuyer>(
  {
    fullName: { type: String, required: true },
    profileImg: {
      type: String,

      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
    status: {
      type: String,
      enum: userStatusARR,
      default: "UNVERIFIED",
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    dateOfBirth: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Query Middleware
// buyerSchema.pre("find", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// buyerSchema.pre("findOne", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// buyerSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

export const Buyer = model<TBuyer>("Buyer", buyerSchema);
