import express from 'express';
import controller from '../controller';
import constantRoutes from './constantRoutes';

const router = express.Router();
const phoneController = new controller.Phone();

router.post(constantRoutes.SEND_CODE, phoneController.sendCode);
router.post(constantRoutes.CODE_VERIFY, phoneController.codeVerify);
router.post(constantRoutes.VERIFY_TOKEN, phoneController.verifyToken);

export default router;
