import { IOrder, IUser } from './user.interface';
import { User } from './user.model';

const createuser = async (data: IUser) => {
  const result = await User.create(data);
  return result;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  if (await User.isUserExists(id)) { // chicking if user exists though static method
    const result = await User.findOne({ userId: id });
    return result;
  } else {
    throw new Error('user does not exist');
  }
};

const updateUser = async (id: string, data: IUser) => {
  const existingUser = await User.isUserExists(id);// chicking if user exists though static method
  if (!existingUser) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndUpdate({ userId: id }, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const existingUser = await User.isUserExists(id);// chicking if user exists though static method
  if (!existingUser) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndDelete({ userId: id });
  return result;
};

const addProductToUser = async (id: string, data: IOrder) => {
  const existingUser = await User.isUserExists(id);// chicking if user exists though static method
  if (!existingUser) {
    throw new Error('User not found');
  }
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: data } },
  );
  return result;
};

const getOrdersofUser = async (id: string) => {
  const existingUser = await User.isUserExists(id);// chicking if user exists though static method
  if (!existingUser) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId: id }, { orders: 1 });
  return result;
};

const getTotalPrice = async (id: string) => {
  const existingUser = await User.isUserExists(id);// chicking if user exists though static method
  if (!existingUser) {
    throw new Error('User not found');
  }
  const result = await User.calculateTotal(id);
  console.log(result);
  return result;
};

export const userService = {
  createuser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addProductToUser,
  getTotalPrice,
  getOrdersofUser,
};
