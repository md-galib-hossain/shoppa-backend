import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SellerServices } from "./seller.service";
import { RequestHandler } from "express";

const softDeleteSeller = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SellerServices.softDeleteSellerFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Seller is deleted successfully',
      data: result,
    });
  });
  const getAllSellers: RequestHandler = catchAsync(async (req, res) => {
    const result = await SellerServices.getAllSellersFromDB(req.query);
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sellers are retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  });

  export const SellerControllers = {softDeleteSeller,getAllSellers}