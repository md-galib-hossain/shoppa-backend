import { z } from "zod";
import { userRolesARR, userStatusARR } from "./user.constant";

// Define the status and role enums
const userStatusEnum = z
  .enum([...userStatusARR] as [string, ...string[]])
  .optional();
const userRoleEnum = z
  .enum([...userRolesARR] as [string, ...string[]])
  .optional();

// Create the user validation schema
const BuyerCreateValidationSchema = z.object({
  body : z.object({
    password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password cannot be longer than 20 characters" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),

  userName: z
    .string({
      invalid_type_error: "Username must be a string",
    })
    .optional(),
  })
});

// Export the validation schema
export const UserValidation = { BuyerCreateValidationSchema };
