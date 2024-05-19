import { TUserRoles, TUserStatus } from "./user.interface";


export const arrayToObject = (arr : string[]) => {
    return arr.reduce((obj : Record<string , any>, item : string) => {
        obj[item] = item;
        return obj;
    }, {});
};

export const userRolesARR = ['SUPER_ADMIN' , 'ADMIN' , 'BUYER' , 'SELLER' , 'MODERATOR']
export const userStatusARR = ['VERIFIED' , 'UNVERIFIED' , 'BANNED']
export const userRoles = arrayToObject(userRolesARR) as TUserRoles
export const userStatus = arrayToObject(userStatusARR) as TUserStatus
