import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import config from '../../app/config';
import { IAddress, IFullName, IOrder, IUser, IUserModel } from './user.interface';

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const OrderSchema = new Schema<IOrder>({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const FullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: { type: String, required: [true, 'Username is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    fullName: {
      type: FullNameSchema,
      required: [true, 'Full name is required'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    isActive: { type: Boolean, required: [true, 'isActive is required'] },
    hobbies: { type: [String], required: [true, 'Hobbies are required'] },
    address: { type: AddressSchema, required: [true, 'Address is required'] },
    orders: {
      type: [OrderSchema],
      required: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// mongoose middleware to hash password before creating document
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

// mongoose middleware to project specific fields on query "find"
UserSchema.pre('find', async function (next) {
  this.find({}).projection({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  next();
});

// mongoose method to excude password
UserSchema.methods.toJSON = function () {
  const { password, _id, __v, ...rest } = this.toObject();
  return rest;
};

// mongoose static mehtod to check User before logic
UserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};


// mongoose static method to implement logic of calculate total price
UserSchema.statics.calculateTotal = async function (id: string) {
  const total = await User.aggregate([
    { $match: { userId: Number(id) } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } },
      },
    },
    { $project: { total: 1, _id: 0 } },
  ]);
  return total;
};

export const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
