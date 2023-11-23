/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import config from "../../app/config";
import { IUser, IUserModel } from "./user.interface";

const AddressSchema = new Schema({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const OrderSchema = new Schema({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const FullNameSchema = new Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const UserSchema = new Schema({
  userId: { type: Number, required: [true, 'User ID is required'], unique: true },
  username: { type: String, required: [true, 'Username is required'],},
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: FullNameSchema, required: [true, 'Full name is required'] },
  age: { type: Number, required: [true, 'Age is required']},
  email: { type: String, required: [true, 'Email is required']},
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: AddressSchema, required: [true, 'Address is required'] },
  orders: { type: [OrderSchema], required: [true, 'At least one order is required'] },
},
{
  toJSON: {
      virtuals: true,
  },
});


  UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.salt_rounds),
    );
    next();
  });

  UserSchema.pre('find' , async function(next) {
    this.find({}).projection({ username: 1, fullName: 1, age: 1 , email:1 , address :1 , _id : 0})
    next()
  })


  UserSchema.methods.toJSON = function () {
    const { password,_id,__v, ...rest } = this.toObject();
    return rest;
};


UserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};



export const User = mongoose.model<IUser,IUserModel>("User", UserSchema);