import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { fileUploader } from "../../utils/filerUploader";
const router = express.Router();

//* flow of request
//* client -> route -> controller -> service -> model

router.post(
  "/create-buyer",
  fileUploader.upload.single("file"),
  // validateRequest(UserValidation.BuyerCreateValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.BuyerCreateValidationSchema.parse(JSON.parse(req.body.data));
    return UserControllers.createBuyer(req, res, next);
  }
);
router.post(
  "/create-seller",
  fileUploader.upload.single("file"),
  // validateRequest(UserValidation.BuyerCreateValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.SellerCreateValidationSchema.parse(JSON.parse(req.body.data));
    return UserControllers.createSeller(req, res, next);
  }
);

export const UserRoutes = router;
