import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { userRoles, userRolesARR, userStatus, userStatusARR } from "./user.constant";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const userSchema = new Schema<TUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: userRolesARR,
      default: 'BUYER',
    },
    status: {
      type: String,
      enum: userStatusARR ,
      default: 'UNVERIFIED',
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
