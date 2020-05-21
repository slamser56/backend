import express from 'express';
import profile from './profile';
import post from './post';
import constantRoutes from './constantRoutes';
import checkJWT from '../middlewares/checkJWT';

const router = express.Router();

router.use(constantRoutes.ROOT, checkJWT);
router.use(constantRoutes.POST, post);
router.use(constantRoutes.PROFILE, profile);

export default router;
