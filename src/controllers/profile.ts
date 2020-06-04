import express from 'express';
import cloudinary, { constantCloudinary } from '../utils/cloudinary';
import * as logger from '../utils/logger';
import { updateAvatar, readAvatar } from '../databaseService/profile';
import { readPhoneNumber } from '../databaseService/user';

class ProfileController {
  uploadAvatar = async ({ body: { image, idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const { url } = await cloudinary.uploader.upload(`${constantCloudinary.BASE64},${image}`);
      await updateAvatar(url, idUser);
      res.status(201).json({ avatar: url });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };

  getProfile = async ({ body: { idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const avatar = await readAvatar(idUser);
      const phoneNumber = await readPhoneNumber(idUser);
      res.status(200).json({ avatar, phoneNumber });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };
}

export default ProfileController;
