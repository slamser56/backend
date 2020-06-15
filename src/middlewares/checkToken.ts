import { verify } from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const checkToken = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = verify(token, process.env.SECRET);
    req.body.userId = (decoded as any).userId;
  } catch (error) {
    res.status(401).send();
    return;
  }
  next();
};

export default checkToken;