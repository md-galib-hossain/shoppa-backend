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

  const exists = await User.isUserExists(
    buyer?.email?.address,
    buyer?.contact?.contactNo
  );
  if (exists) {
    throw new AppError(httpStatus.NOT_FOUND, "Credentials already exists!!");
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

    if (file) {
      const image = await fileUploader.uploadToCloudinary(file);
      if (image) {
        buyerData.profileImg = image?.secure_url;
      }
    }
    //transaction 1 creating user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    buyerData.user = newUser[0]._id;

    //transaction 2 creating buyer
    buyerData.email = email.address
    buyerData.userName = userName
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
  const exists = await User.isUserExists(
    seller?.email?.address,
    seller?.contact?.contactNo
  );

  if (exists) {
    throw new AppError(httpStatus.NOT_FOUND, "Credentials already exists!!");
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
    const { email, userName, contact, role, ...sellerData } = seller;
    const userData = {
      email,
      userName,
      password,
      contact,
      role,
    };
    sellerData.userName = userName;
    if (file) {
      const image = await fileUploader.uploadToCloudinary(file);
      if (image) {
        sellerData.profileImg = image?.secure_url;
      }
    }

    //transaction 1 creating user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    sellerData.user = newUser[0]._id;

    //transaction 2 creating buyer
    sellerData.email = email.address
    sellerData.userName = userName
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
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = { createBuyerIntoDb, createSellerIntoDb };
