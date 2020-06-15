import express from 'express';
import controller from '../controllers';
import constantRoutes from './constantRoutes';

const router = express.Router();
const postController = new controller.Post();

router.post(constantRoutes.UPLOAD_POST, postController.uploadPost);
router.post(constantRoutes.GET_POSTS, postController.getPosts);
router.post(constantRoutes.DELETE_POST, postController.deletePost);

export default router;
