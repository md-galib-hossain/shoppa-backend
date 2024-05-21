import mongoose from "mongoose";
import { Seller } from "./seller.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { sellerSearchableFields } from "./seller.constant";
import QueryBuilder from "../../builder/QueryBuilder";


const getAllSellersFromDB = async (query: Record<string, unknown>) => {
  const sellerQuery = new QueryBuilder(Seller.find().populate("user"), query)
    .search(sellerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await sellerQuery.countTotal();
  const result = await sellerQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const softDeleteSellerFromDB = async (id: string) => {
  if (!(await Seller.findById(id))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "There is no seller with this id"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedSeller = await Seller.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedSeller) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete seller");
    }

    // get user _id from deletedStudent
    const userId = deletedSeller.user;

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

    return deletedSeller;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete seller");
  }
};

export const SellerServices = { softDeleteSellerFromDB,getAllSellersFromDB };
