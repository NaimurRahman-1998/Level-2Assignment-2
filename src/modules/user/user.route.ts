import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/' , userController.createuser)

export const userRoutes = router;