import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import {
  userRoles,
  userRolesARR,
  userStatus,
  userStatusARR,
} from "./user.constant";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const contactNoSchema = new Schema(
  {
    contactNo: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["VERIFIED", "UNVERIFIED"],
      default: "UNVERIFIED",
    },
  },
  { _id: false }
);

const userSchema = new Schema<TUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      address: { type: String, required: true ,unique: true},
      status: {
        type: String,
        enum: ["VERIFIED", "UNVERIFIED"],
        default: "UNVERIFIED",
      },
    },
    contact: contactNoSchema,
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: userRolesARR,
      default: "BUYER",
    },
    status: {
      type: String,
      enum: userStatusARR,
      default: "UNVERIFIED",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this; //current document
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  next();
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
