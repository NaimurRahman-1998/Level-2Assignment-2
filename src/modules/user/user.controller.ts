import { Request, Response } from 'express';
import { userService } from './user.services';

const createuser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userService.createuser(userData);
    res.status(201).json({
        success : true,
        message : "User Created Successfully!",
        data : result
    });
  } catch (error) {
    res.status(500).json({
        message: "Error creating user",
        error: error
    })
  }
};

export const userController = {
    createuser
}
