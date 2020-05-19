import express from 'express';
import controller from '../controller';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
const postController = new controller.post();

const verifyToken = async function (req, res, next) {
  try {
    const { _id } = await jwt.verify(req.body.token, process.env.SECRET);
    Object.assign(req.body, { _id });
  } catch (error) {
    return res.status(401).send();
  }
  next();
};

router.post('/uploadPost', verifyToken, postController.uploadPost);

export default router;
