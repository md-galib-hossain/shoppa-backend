import httpStatus from "http-status";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { userRoles } from "./user.constant";
import { generateUniqueUserName } from "./user.utils";
import { fileUploader } from "../../utils/filerUploader";
import mongoose from "mongoose";
import { Buyer } from "../Buyer/buyer.model";
import { Seller } from "../Seller/seller.model";

const createBuyerIntoDb = async (req: any) => {
  const {
    body: { buyer, password },
    file,
  } = req;
  const exists = await User.findOne({
    email: buyer?.email?.address,
    role: userRoles.BUYER,
  });
  if (exists) {
    throw new AppError(httpStatus.NOT_FOUND, "Email already exists!!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const generatedName = await generateUniqueUserName({
      userName: buyer?.userName,
      email: buyer?.email?.address,
    });
    buyer.userName = generatedName;
    buyer.needsPasswordChange = false;

    const { email, userName, contact, ...buyerData } = buyer;
    const userData = {
      email,
      userName,
      password,
      contact,
    };
    buyerData.userName = userName;

    const image = await fileUploader.uploadToCloudinary(file);
    image && (buyerData.profileImg = image?.secure_url);
    //transaction 1 creating user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    buyerData.user = newUser[0]._id;

    //transaction 2 creating buyer
    const newBuyer = await Buyer.create([buyerData], { session });
    if (!newBuyer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create buyer");
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await Buyer.findById(newBuyer[0]._id).populate({
      path: "user",
      select: "-password -needsPasswordChange",
    });
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createSellerIntoDb = async (req: any) => {
  const {
    body: { seller, password },
    file,
  } = req;
  const exists = await User.findOne({
    email: { address: seller?.email?.address },
    role: userRoles.SELLER,
  });
  if (exists) {
    throw new AppError(httpStatus.NOT_FOUND, "Email already exists!!");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const generatedName = await generateUniqueUserName({
      userName: seller?.userName,
      email: seller?.email?.address,
    });
    seller.userName = generatedName;
    seller.needsPasswordChange = false;
    const { email, userName, contact,role, ...sellerData } = seller;
    const userData = {
      email,
      userName,
      password,
      contact,
      role
    };
    sellerData.userName = userName;
    const image = await fileUploader.uploadToCloudinary(file);
    image && (sellerData.profileImg = image?.secure_url);

    //transaction 1 creating user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    sellerData.user = newUser[0]._id;

      //transaction 2 creating buyer
      const newSeller = await Seller.create([sellerData], { session });
      if (!newSeller.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create seller");
      }
      
    await session.commitTransaction();
    await session.endSession();
    const result = await Seller.findById(newSeller[0]._id).populate({
      path: "user",
      select: "-password -needsPasswordChange",
    });
    return result
  } catch (err: any) {

    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = { createBuyerIntoDb, createSellerIntoDb };


