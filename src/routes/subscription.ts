import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const subscriptionController = new controller.Subscription();

router.post(constantRoutes.SUBSCRIBE, subscriptionController.subscribe);
router.post(constantRoutes.UNSUBSCRIBE, subscriptionController.unsubscribe);
router.post(constantRoutes.GET_SUBSCRIBE, subscriptionController.getSubscribe);

export default router;