import express from 'express';
import controller from '../controller';
const router = express.Router();
const profileController = new controller.profile();

router.post('/uploadAvatar', profileController.uploadAvatar);
router.post('/getAvatar', profileController.getAvatar);

export default router;