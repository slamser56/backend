import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const profileController = new controller.Profile();

router.put(constantRoutes.AVATAR, profileController.uploadAvatar);
router.get(constantRoutes.ROOT, profileController.getProfile);

export default router;
