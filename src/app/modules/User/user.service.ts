import httpStatus from "http-status";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { userRoles } from "./user.constant";
import { generateUniqueUserName } from "./user.utils";
import { TUser } from "./user.interface";

const createBuyerIntoDb = async (payload: TUser) => {
  const exists = await User.findOne({
    email: payload?.email,
    role: userRoles.BUYER,
  });
  if (exists) {
    throw new AppError(httpStatus.NOT_FOUND, "Email already exists!!");
  }

  const generatedName = await generateUniqueUserName({
    userName: payload?.userName,
    email: payload?.email,
  });
  payload.userName = generatedName;
  payload.needsPasswordChange = false;

  const result = await User.create(payload);
  return result;
};
export const UserServices = { createBuyerIntoDb };
