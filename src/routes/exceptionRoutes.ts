import express from 'express';
import registration from './registration';
import constantRoutes from './constantRoutes';

const router = express.Router();

router.post(constantRoutes.ROOT, (req: express.Request, res: express.Response) => res.status(200).send());
router.use(constantRoutes.REGISTRATION, registration);

export default router;
