import jwt from 'jsonwebtoken';
import express from 'express';

const checkToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<express.Response | void> => {
  try {
    const { idUser } = jwt.verify(req.body.token, process.env.SECRET);
    req.body.idUser = idUser;
  } catch (error) {
    return res.status(401).send();
  }
  return next();
};

export default checkToken;
