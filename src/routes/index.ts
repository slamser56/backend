import express from 'express';
import jwt from 'jsonwebtoken';
import profile from './profile';
import post from './post';
import constantRoutes from './constantRoutes';

const router = express.Router();

router.use(constantRoutes.ROOT,
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
    try {
      const { _id } = jwt.verify(req.body.token, process.env.SECRET);// name!
      req.body._id = _id;
    } catch (error) {
      return res.status(401).send();
    }
    return next();
  });
router.use(constantRoutes.POST, post);
router.use(constantRoutes.PROFILE, profile);

export default router;
