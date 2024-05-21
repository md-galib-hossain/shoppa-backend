import { Model } from "mongoose";
import { StringValidation } from "zod";

export type TUser = {
  password: string;
  email: { address: string; status: "VERIFIED" | "UNVERIFIED" };
  status: "VERIFIED" | "UNVERIFIED" | "BANNED";
  needsPasswordChange: boolean;
  role: "SUPER_ADMIN" | "ADMIN" | "BUYER" | "SELLER" | "MODERATOR";
  isDeleted: boolean;
  userName: string;
  contact: { contactNo: string; status: "VERIFIED" | "UNVERIFIED" };
};

export type TUserRoles = {
  SUPER_ADMIN: string;
  ADMIN: StringValidation;
  BUYER: string;
  SELLER: string;
  MODERATOR: string;
};

export type TUserStatus = {
  VERIFIED: string;
  UNVERIFIED: string;
  BANNED: string;
};

export interface UserModel extends Model<TUser> {

  isUserExists(email : string, contactNo : string) : Promise<TUser | null>

}