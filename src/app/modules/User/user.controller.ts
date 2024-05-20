import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createBuyer = catchAsync(async (req, res) => {
  const result = await UserServices.createBuyerIntoDb(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Buyer profile is created succesfully",
    data: result,
  });
});
const createSeller = catchAsync(async (req, res) => {
  const result = await UserServices.createSellerIntoDb(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller profile is created succesfully",
    data: result,
  });
});

// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body;

//   const result = await UserServices.createAdminIntoDB(password, adminData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created succesfully',
//     data: result,
//   });
// });

export const UserControllers = {
  createBuyer,createSeller
};
