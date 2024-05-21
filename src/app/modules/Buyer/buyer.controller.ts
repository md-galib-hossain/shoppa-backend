import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BuyerServices } from "./buyer.service";
import { RequestHandler } from "express";

const softDeleteBuyer = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BuyerServices.softDeleteBuyerFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer is deleted successfully',
      data: result,
    });
  });

  const getAllBuyers: RequestHandler = catchAsync(async (req, res) => {
    const result = await BuyerServices.getAllBuyersFromDB(req.query);
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyers are retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  });

  export const BuyerControllers = {softDeleteBuyer,getAllBuyers}