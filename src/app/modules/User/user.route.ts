import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
const router = express.Router();

//* flow of request
//* client -> route -> controller -> service -> model


router.post(
  '/create-buyer',
  validateRequest(UserValidation.BuyerCreateValidationSchema),
  UserControllers.createBuyer,
);




export const UserRoutes = router;
