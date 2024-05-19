import { StringValidation } from "zod";

export type TUser = {
id : string;
password : string;
email : string;
status: 'VERIFIED' | 'UNVERIFIED' | 'BANNED';
needsPasswordChange : boolean;
role : 'SUPER_ADMIN' | 'ADMIN' | 'BUYER' | 'SELLER' | 'MODERATOR';
isDeleted : boolean;
userName : string
}

export type TUserRoles ={
    SUPER_ADMIN : string;
    ADMIN : StringValidation;
    BUYER: string;
    SELLER : string;
    MODERATOR : string
}

export type TUserStatus = {
    VERIFIED : string;
    UNVERIFIED : string;
    BANNED : string
}

