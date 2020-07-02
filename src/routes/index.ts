import express from 'express';
import profile from './profile';
import post from './post';
import subscription from './subscription';
import constantRoutes from './constantRoutes';
import checkToken from '../middlewares/checkToken';
import users from './users';

const router = express.Router();

router.use(constantRoutes.ROOT, checkToken);
router.use(constantRoutes.POST, post);
router.use(constantRoutes.PROFILE, profile);
router.use(constantRoutes.SUBSCRIPTION, subscription);
router.use(constantRoutes.USERS, users);

export default router;
