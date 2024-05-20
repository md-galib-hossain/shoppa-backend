import { Types } from "mongoose";

export type TGender = "MALE" | "FEMALE";

export type TBuyer = {
  fullName: string;
  profileImg: string;
  user: Types.ObjectId;
  gender: TGender;
  status: "VERIFIED" | "UNVERIFIED" | "BANNED";
  needsPasswordChange: boolean;
  presentAddress: string;
  permanentAddress: string;
  dateOfBirth?: Date;
};
