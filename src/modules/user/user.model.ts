import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import config from "../../app/config";
import { IAddress, IFullName, IOrder, IUser } from "./user.interface";

const AddressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const FullNameSchema = new Schema<IFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const UserSchema = new Schema<IUser>({
    userId: { type: Number, required: true ,unique : true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: FullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: AddressSchema, required: true },
    orders: { type: [OrderSchema], required: true },
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);


  UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.salt_rounds),
    );
    next();
  });

export const User = mongoose.model<IUser>("User", UserSchema);