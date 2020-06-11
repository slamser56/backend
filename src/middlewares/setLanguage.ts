import express from 'express';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(['en', 'ru']);

const setLanguage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  req.body.language = acceptLanguage.get(req.headers['accept-language']);
  next();
};

export default setLanguage;
