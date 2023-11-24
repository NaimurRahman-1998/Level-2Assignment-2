/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userService } from './user.services';
import UserValidationSchema from './user.validation';

const createuser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = UserValidationSchema.parse(userData);
    const result = await userService.createuser(zodParsedData);
    res.status(201).json({
      success: true,
      message: 'User Created Successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userService.getSingleUser(id);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error:
        Object.keys(error).length === 0
          ? { code: 404, description: 'User not found!' }
          : error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const id = req.params.userId;
    const result = await userService.updateUser(id, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: Object.keys(error).length !== 0 && 'Error updating user',
      error:
        Object.keys(error).length === 0
          ? { code: 404, description: 'User not found!' }
          : error,
    });
  }
};
const addProductToUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const id = req.params.userId;
    await userService.addProductToUser(id, userData);
    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error:
        Object.keys(error).length === 0
          ? { code: 404, description: 'User not found!' }
          : error,
    });
  }
};

const getOrdersofUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userService.getOrdersofUser(id);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error:
        Object.keys(error).length === 0
          ? { code: 404, description: 'User not found!' }
          : error,
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userService.getTotalPrice(id);
    if (Array.isArray(result) && result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No products found for the user.',
        data: null, 
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error:
        Object.keys(error).length === 0
          ? { code: 404, description: 'User not found!' }
          : error,
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    await userService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: 'User deleted Successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User Not found',
      error:
        Object.keys(error).length === 0
          ? { code: 404, description: 'User not found!' }
          : error,
    });
  }
};

export const userController = {
  createuser,
  getAllUser,
  getSingleUser,
  updateUser,
  addProductToUser,
  getOrdersofUser,
  getTotalPrice,
  deleteUser,
};
