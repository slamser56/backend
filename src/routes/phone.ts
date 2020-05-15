import express from 'express';
import controller from '../controller';
const router = express.Router();
const phoneController = new controller.phone();

router.post('/sendCode', phoneController.sendCode);
router.post('/codeVerify', phoneController.codeVerify);
router.post('/verifyToken', phoneController.verifyToken);

export default router;
