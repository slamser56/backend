import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const registrationController = new controller.Registration();
const tokenController = new controller.Token();

router.post(constantRoutes.SEND_CODE, registrationController.sendCode);
router.post(constantRoutes.VERIFY_CODE, registrationController.verifyCode);
router.get(constantRoutes.LOG_IN, registrationController.logIn);
router.get(constantRoutes.VERIFY_TOKEN, tokenController.verifyToken);

export default router;
