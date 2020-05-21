import express from 'express';
import profile from './profile';
import post from './post';
import constantRoutes from './constantRoutes';
import checkToken from '../middlewares/checkToken';

const router = express.Router();

router.use(constantRoutes.ROOT, checkToken);
router.use(constantRoutes.POST, post);
router.use(constantRoutes.PROFILE, profile);

export default router;
