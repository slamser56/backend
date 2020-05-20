import express from 'express';
import dotenv from 'dotenv';
import controller from '../controller';
import constantRoutes from './constantRoutes';

dotenv.config();
const router = express.Router();
const postController = new controller.Post();

router.post(constantRoutes.UPLOAD_POST, postController.uploadPost);

export default router;
