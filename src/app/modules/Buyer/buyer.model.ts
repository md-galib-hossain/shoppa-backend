
import { Schema, model } from "mongoose";
import { TBuyer } from "./buyer.interface";
import { userStatusARR } from "../User/user.constant";


const buyerSchema = new Schema<TBuyer>(
  {
    fullName: { type: String, required: true },
    profileImg: { 
        type: String,
    
         default:'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
         },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
    status: {
      type: String,
      enum: userStatusARR,
      default: 'UNVERIFIED',
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    dateOfBirth: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Buyer = model<TBuyer>("Buyer", buyerSchema);
