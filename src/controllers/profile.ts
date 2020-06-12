import express from 'express';
import cloudinary, { constantCloudinary } from '../utils/cloudinary';
import * as logger from '../utils/logger';
import { updateAvatar, findAvatar } from '../databaseService/profile';
import { findPhoneNumber } from '../databaseService/user';
import t from '../lang/index';

class ProfileController {
  uploadAvatar = async ({ body: { image, idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const { url } = await cloudinary.uploader.upload(`${constantCloudinary.BASE64},${image}`);
      await updateAvatar(url, idUser);
      res.status(201).json({ avatar: url });
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  getProfile = async ({ body: { idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const avatar = await findAvatar(idUser);
      const phoneNumber = await findPhoneNumber(idUser);
      res.status(200).json({ avatar, phoneNumber });
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default ProfileController;
