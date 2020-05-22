import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const profileController = new controller.Profile();

router.post(constantRoutes.UPLOAD_AVATAR, profileController.uploadAvatar);
router.post(constantRoutes.DOWNLOAD_AVATAR, profileController.downloadAvatar);

export default router;
