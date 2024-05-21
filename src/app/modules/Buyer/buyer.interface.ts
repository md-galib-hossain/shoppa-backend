import { Types } from "mongoose";

export type TGender = "MALE" | "FEMALE";

export type TBuyer = {
  fullName: string;
  profileImg: string;
  user: Types.ObjectId;
  userName: string;
  email: string;
  gender: TGender;
  status: "VERIFIED" | "UNVERIFIED" | "BANNED";
  needsPasswordChange: boolean;
  presentAddress: string;
  permanentAddress: string;
  dateOfBirth?: Date;
  isDeleted : boolean
};
