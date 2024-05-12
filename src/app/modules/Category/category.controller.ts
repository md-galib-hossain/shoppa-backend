import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
const result = await CategoryServices.createCategoryIntoDb(req.body)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is created succesfully',
    data: result,
 })
});
const createSubCategory = catchAsync(async (req: Request, res: Response) => {
const result = await CategoryServices.createSubCategoryIntoDb(req.body)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is created succesfully',
    data: result,
 })
});

export const CategoryControllers = {
  createCategory,createSubCategory
};
