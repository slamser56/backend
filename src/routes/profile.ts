import express from 'express';
import dotenv from 'dotenv';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

dotenv.config();
const router = express.Router();
const profileController = new controller.Profile();

router.post(constantRoutes.UPLOAD_AVATAR, profileController.uploadAvatar);
router.post(constantRoutes.DOWNLOAD_AVATAR, profileController.downloadAvatar);

export default router;
