import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/api/users', userController.createuser);
router.get('/api/users', userController.getAllUser);
router.get('/api/users/:userId', userController.getSingleUser);
router.put('/api/users/:userId', userController.updateUser);
router.get('/api/users/:userId/orders')
router.put('/api/users/:userId/orders',  userController.addProductToUser);
router.delete('/api/users/:userId', userController.deleteUser);

export const userRoutes = router;
