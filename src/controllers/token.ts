import express from 'express';
import jwt from 'jsonwebtoken';
import * as logger from '../utils/logger';

class TokenController {
  verifyToken = async ({ body: { token } }: express.Request, res: express.Response): Promise<void> => {
    try {
      jwt.verify(token, process.env.SECRET);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(401).send();
    }
  };
}


export default TokenController;
