import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { Buyer } from "./buyer.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { buyerSearchableFields } from "./buyer.constant";
import { userSearchableFields } from "../User/user.constant";

const getAllBuyersFromDB = async (query: Record<string, unknown>) => {
  const buyerQuery = new QueryBuilder(Buyer.find().populate("user"), query)
    .search(buyerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  

  


  const meta = await buyerQuery.countTotal();
  const result = await buyerQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const softDeleteBuyerFromDB = async (id: string) => {
  if (!(await Buyer.findById(id))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "There is no buyer with this id"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedBuyer = await Buyer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedBuyer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete buyer");
    }

    // get user _id from deletedStudent
    const userId = deletedBuyer.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedBuyer;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete buyer");
  }
};

export const BuyerServices = { softDeleteBuyerFromDB,getAllBuyersFromDB };
