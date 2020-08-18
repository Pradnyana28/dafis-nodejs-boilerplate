import { Document } from 'mongoose';

export default interface IUser extends Document {
    firstName: string, 
    lastName: string,
    email: string,
    emailVerified: boolean,
    username: string,
    password: string,
    roles: object,
    address: string,
    address2: string,
    city: object,
    cityId: string,
    cityName: string,
    province: object,
    provinceId: string,
    provinceName: string,
    avatar: string,
    options: Map<any, any>,
    deletedAt: string | null,

    generatePassword(password: string): string,
    verifyPassword(password: string): boolean
}