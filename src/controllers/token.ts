import express from 'express';
import { verify } from 'jsonwebtoken';
import * as logger from '../utils/logger';

class TokenController {
  verifyToken = async ({ query: { token } }: express.Request, res: express.Response): Promise<void> => {
    try {
      verify(token as string, process.env.SECRET);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(401).send();
    }
  };
}

export default TokenController;
