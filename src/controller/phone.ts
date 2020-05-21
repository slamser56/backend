import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as logger from '../utils/logger';
import * as phoneAction from '../action/phone';

dotenv.config();

class PhoneController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<express.Response> => {
    try {
      await phoneAction.sendCode(phoneNumber);
      return res.status(200).send();
    } catch (err) {
      if (err.status) {
        return res.status(err.status).send();
      }
      logger.error(err);
      return res.status(500).send();
    }
  };

  codeVerify = async (
    { body: { phoneNumber, code } }: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    try {
      const token = await phoneAction.codeVerify(phoneNumber, code);
      return res.status(200).json({ token });
    } catch (err) {
      if (err.status) {
        return res.status(err.status).send();
      }
      logger.error(err);
      return res.status(500).send();
    }
  };

  verifyToken = async ({ body: { token } }: express.Request, res: express.Response): Promise<express.Response> => {
    try {
      jwt.verify(token, process.env.SECRET);
      return res.status(200).send();
    } catch (err) {
      return res.status(401).send();
    }
  };
}

export default PhoneController;
