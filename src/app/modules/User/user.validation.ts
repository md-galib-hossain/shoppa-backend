import { z } from "zod";
import { userRolesARR, userStatusARR } from "./user.constant";
import { Types } from "mongoose";

// Define the status and role enums
const genderEnum = z.enum(["MALE", "FEMALE"]);
const statusEnum = z.enum(["VERIFIED", "UNVERIFIED", "BANNED"]);
const idTypeEnum = z.enum(["NID", "PASSPORT"]);
const nidStatusEnum = z.enum(["VERIFIED", "UNVERIFIED", "PENDING"]);
// Create the user validation schema
const BuyerCreateValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password cannot be longer than 20 characters" }),

  buyer: z.object({
    fullName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: "Name must start with a capital letter",
      }),
    contact: z.object({
      contactNo: z.string({ required_error: "Contact no is required" }),
      status: z.enum(["VERIFIED", "UNVERIFIED"]).optional(),
    }),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]),
    email: z.object({
      address: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email address" }),
    }),
    profileImg: z.string().optional(),

    userName: z
      .string({
        invalid_type_error: "Username must be a string",
      })
      .optional(),
  }),
});

//*sub schema
const BankInfoSchema = z.object({
  accountTitle: z.string(),
  accountNumber: z.string(),
  bankName: z.string(),
  branchName: z.string(),
  routingNumber: z.string(),
  chequeImg: z.string(),
});

const AddressInfoSchema = z.object({
  address: z.string(),
  country: z.string(),
  division: z.string(),
  city: z.string(),
  postCode: z.string(),
});

const NidInfoSchema = z.object({
  idType: idTypeEnum,
  fullName: z.string(),
  idNo: z.string(),
  idFrontImg: z.string(),
  idBackImg: z.string(),
  isDeleted: z.boolean(),
  status: nidStatusEnum,
});

//*sub schema

// Define the main seller schema
const SellerCreateValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password cannot be longer than 20 characters" }),
  seller: z.object({
    bankInfo: BankInfoSchema.optional(),
    email: z.object({
      address: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email address" }),
    }),
    shopName: z.string({ required_error: "Shop name is required" }),
    contact: z.object({
      contactNo: z.string({ required_error: "Contact no is required" }),
      status: z.enum(["VERIFIED", "UNVERIFIED"]).optional(),
    }),
    gender: z.enum(["MALE", "FEMALE"]),

    warehouseAddressInfo: AddressInfoSchema.optional(),
    businessAddressInfo: AddressInfoSchema.optional(),
    returnAddressInfo: AddressInfoSchema.optional(),
    nidInfo: NidInfoSchema.optional(),
    accountType: z.enum(["INDIVIDUAL", "BUSINESS"]),
    age: z.number().int().positive(),
    sellerType: z.enum(["LOCAL", "GLOBAL"]),
    profileImg: z.string().optional(),
    userName: z
      .string({
        invalid_type_error: "Username must be a string",
      })
      .optional(),
      role : z.enum(["SELLER"])
  }),
});

export const UserValidation = {
  BuyerCreateValidationSchema,
  SellerCreateValidationSchema,
};
