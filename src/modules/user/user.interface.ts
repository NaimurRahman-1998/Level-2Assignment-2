/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface IFullName {
  firstName: string;
  lastName: string;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders: IOrder[];
}

export interface IUserModel extends Model<IUser> {
  isUserExists(id: string): Promise<IUser | null>;
}
