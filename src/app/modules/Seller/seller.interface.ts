import { Types } from "mongoose";

export type TGender = "MALE" | "FEMALE";

type TBankInfo = {
  accountTitle: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  routingNumber: string;
  chequeImg: string;
};

type TWareHouseAddressInfo = {
  address: string;
  country: string;
  division: string;
  city: string;
  postCode: string;
};
type TBusinessAddressInfo = {
  address: string;
  country: string;
  division: string;
  city: string;
  postCode: string;
};
type TReturnAddressInfo = {
  address: string;
  country: string;
  division: string;
  city: string;
  postCode: string;
};
type TNidInfo = {
  idType: "NID" | "PASSPORT";
  fullName: string;
  idNo: string;
  idFrontImg: string;
  idBackImg: string;
  isDeleted: boolean;
  status: "VERIFIED" | "UNVERIFIED" | "PENDING";
};

export type TSeller = {
  bankInfo?: TBankInfo;
  shopName: string;
  warehouseAddressInfo?: TWareHouseAddressInfo;
  businessAddressInfo?: TBusinessAddressInfo;
  returnAddressInfo?: TReturnAddressInfo;
  nidInfo?: TNidInfo;
  accountType: "INDIVIDUAL" | "BUSINESS";
  age: number;
  sellerType: "LOCAL" | "GLOBAL";
  profileImg?: string;
  user: Types.ObjectId;
  status: "VERIFIED" | "UNVERIFIED" | "BANNED";
};
