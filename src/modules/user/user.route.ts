import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createuser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser)
router.get('/:userId/orders', userController.getOrdersofUser);
router.get('/:userId/orders/total-price', userController.getTotalPrice,);
router.put('/:userId/orders', userController.addProductToUser);
router.delete('/:userId', userController.deleteUser);

export const userRoutes = router;
