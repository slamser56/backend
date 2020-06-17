import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const postController = new controller.Post();

router.post(constantRoutes.ROOT, postController.uploadPost);
router.get(constantRoutes.ROOT, postController.getPosts);
router.delete(constantRoutes.ROOT, postController.deletePost);

export default router;
