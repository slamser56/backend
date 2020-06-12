import express from 'express';
import phone from './phone';
import constantRoutes from './constantRoutes';

const router = express.Router();

router.post(constantRoutes.ROOT, (req: express.Request, res: express.Response) => res.status(200).send());
router.use(constantRoutes.PHONE, phone);

export default router;
