import express from 'express';
import cloudinary from '../utils/cloudinary';
import * as logger from '../utils/logger';
import { setAvatar, getAvatar } from '../databaseService/profile';

class ProfileController {
  uploadAvatar = async ({ body: { image, idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const { url } = await cloudinary.uploader.upload(`data:image/jpeg;base64,${image}`);
      await setAvatar(url, idUser);
      res.status(200).json({ avatar: url });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };

  downloadAvatar = async ({ body: { idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const avatar = await getAvatar(idUser);
      res.status(200).json({ avatar });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };
}

export default ProfileController;
