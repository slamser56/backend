import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const checkToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { idUser } = jwt.verify( token, process.env.SECRET);
    req.body.idUser = idUser;
  } catch (error) {
    res.status(401).send();
    return;
  }
  next();
};

export default checkToken;

