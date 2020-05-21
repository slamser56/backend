import express from 'express';
import * as logger from '../utils/logger';
import { setAvatar, getAvatar } from '../databaseService/profile';

class ProfileController {
  uploadAvatar = async (
    { body: { image, idUser } }: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    try {
      const avatar = await setAvatar(image, idUser);
      return res.status(200).json({ avatar });
    } catch (err) {
      logger.error(err);
      return res.status(500).send();
    }
  };

  downloadAvatar = async ({ body: { idUser } }: express.Request, res: express.Response): Promise<express.Response> => {
    try {
      const avatar = await getAvatar(idUser);
      return res.status(200).json({ avatar });
    } catch (err) {
      if (err.status) {
        return res.status(err.status).send();
      }
      logger.error(err);
      return res.status(500).send();
    }
  };
}

export default ProfileController;
