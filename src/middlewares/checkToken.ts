import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
import lodash from 'lodash';

dotenv.config();

const checkToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<express.Response | void> => {
  try {
    const { idUser } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
    req.body.idUser = idUser;
  } catch (error) {
    res.status(401).send();
  }
  return next();
};

export default checkToken;
