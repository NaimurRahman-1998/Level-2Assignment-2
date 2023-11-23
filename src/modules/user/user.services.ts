import { IUser } from './user.interface';
import { User } from './user.model';

const createuser = async (data: IUser) => {
  try {
    const result = await User.create(data);
    return result;
  } catch (error) {
    // Handle the error
    console.error('Error creating user:', error);
    throw error;
  }
};

const getAllUser = async () => {
  try {
    const result = await User.find();
    return result;
  } catch (error) {
    // Handle the error
    console.error('Error getting all users:', error);
    throw error;
  }
};

const getSingleUser = async (id: string) => {
    if (await User.isUserExists(id)) {
        const result = await User.findOne({ userId: id });
        return result;
    }else {
        throw new Error('user does not exist')
    }
}; 


const updateUser = async (id: string, data: IUser) => {
  try {
    const user = await User.findOne({ userId: id });
    if (!user) {
        throw new Error('User not found');
      }  
    const result = await User.findOneAndUpdate({ userId: id }, data, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (error) {
    // Handle the error
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (id: string) => {
  try {
    const result = await User.findOneAndDelete({ userId: id });
    return result;
  } catch (error) {
    // Handle the error
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const userService = {
  createuser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
