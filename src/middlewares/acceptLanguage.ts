import express from 'express';
import { get } from 'lodash';
import { changeLanguage } from '../lang';

const acceptLanguage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  changeLanguage(get(req.headers, 'accept-language', 'en'));
  next();
};

export default acceptLanguage;
