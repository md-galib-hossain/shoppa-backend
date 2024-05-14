import { Model, Types } from "mongoose";


export type TCategory = {
    id? : string;
    name : string;
    isDeleted? : boolean;
    image : string;
   
}

export type TSubCategory = {
    id? : string;
    name : string;
    isDeleted? : boolean;
    image : string;
    categoryId : Types.ObjectId
}

export interface CategoryModel extends Model<TCategory>{
    isCategoryExists(id : string) : Promise<TCategory | null>;
    isCategoryExistsByName(id : string) : Promise<TCategory | null>;

}
export interface SubCategoryModel extends Model<TSubCategory>{
    isSubCategoryExists(id : string) : Boolean

}