import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const phoneController = new controller.Phone();
const tokenController = new controller.Token();

router.post(constantRoutes.SEND_CODE, phoneController.sendCode);
router.post(constantRoutes.VERIFY_CODE, phoneController.verifyCode);
router.post(constantRoutes.VERIFY_TOKEN, tokenController.verifyToken);

export default router;
