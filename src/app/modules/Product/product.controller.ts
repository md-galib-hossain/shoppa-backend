import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
const result = await ProductServices.createProductIntoDb(req.body)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created succesfully',
    data: result,
 })
});

export const ProductControllers = {
  createProduct,
};
