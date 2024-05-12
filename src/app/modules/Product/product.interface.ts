import { Model, Types } from "mongoose";

export type TProductStatus = "ACTIVE" | "INACTIVE"

export type TProduct = {
    id? : string;
    name : string;
    isDeleted? : boolean;
    images? : string[];
    price?: number;
    sellerId : Types.ObjectId;
    isCod? : boolean;
    categoryId : Types.ObjectId;
    stockQuantity? : number;
    status? : TProductStatus
}

export interface ProductModel extends Model<TProduct>{
    isProductExists(id : string) : Promise<TProduct | null>
}