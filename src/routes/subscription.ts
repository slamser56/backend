import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const subscriptionController = new controller.Subscription();

router.post(constantRoutes.ROOT, subscriptionController.subscribe);
router.delete(constantRoutes.ROOT, subscriptionController.unsubscribe);
router.get(constantRoutes.ROOT, subscriptionController.getSubscribe);

export default router;