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
const updateCategory = catchAsync(async (req: Request, res: Response) => {
   const {categoryId} = req.params
const result = await CategoryServices.updateSingleCategory(categoryId,req.body)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated succesfully',
    data: result,
 })
});
const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
const {categoryId} = req.params
   const result = await CategoryServices.deleteSingleCategory(categoryId)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted succesfully',
    data: result,
 })
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
const result = await CategoryServices.getAllCategoryFromDb()
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched succesfully',
    data: result,
 })
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
   const {categoryId} = req.params
const result = await CategoryServices.getSingleCategory(categoryId)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched succesfully',
    data: result,
 })
});
const createSubCategory = catchAsync(async (req: Request, res: Response) => {
   const {categoryId} = req.params
   console.log(categoryId)
const result = await CategoryServices.createSubCategoryIntoDb(req.body)
 sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is created succesfully',
    data: result,
 })
});

const getAllSubCategory = catchAsync(async (req: Request, res: Response) => {
  console.log("haha")
   const result = await CategoryServices.getAllSubCategoryFromDb()
    sendResponse(res,{
       statusCode: httpStatus.OK,
       success: true,
       message: 'Sub Categories fetched succesfully',
       data: result,
    })
   });
   const getSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
      const {subCategoryId} = req.params
   const result = await CategoryServices.getSingleSubCategory(subCategoryId)
    sendResponse(res,{
       statusCode: httpStatus.OK,
       success: true,
       message: 'Sub Category fetched succesfully',
       data: result,
    })
   });
   const deleteSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
      const {subCategoryId} = req.params
         const result = await CategoryServices.deleteSingleSubCategory(subCategoryId)
       sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: 'Sub Category deleted succesfully',
          data: result,
       })
      });

      const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
         const {subCategoryId} = req.params
      const result = await CategoryServices.updateSingleSubCategory(subCategoryId,req.body)
       sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: 'Sub Category is updated succesfully',
          data: result,
       })
      });

export const CategoryControllers = {
  createCategory,updateCategory,updateSubCategory,deleteSingleCategory,deleteSingleSubCategory,createSubCategory,getAllCategory,getSingleCategory,getAllSubCategory,getSingleSubCategory
};
