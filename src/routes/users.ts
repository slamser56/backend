import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const userController = new controller.User();

router.get(constantRoutes.ROOT, userController.getUsers);

export default router;