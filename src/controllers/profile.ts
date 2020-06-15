import express from 'express';
import cloudinary, { constantCloudinary } from '../utils/cloudinary';
import * as logger from '../utils/logger';
import { updateAvatar, findUser } from '../databaseService/profile';
import t from '../lang/index';

class ProfileController {
  uploadAvatar = async ({ body: { image, userId } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const { url } = await cloudinary.uploader.upload(`${constantCloudinary.BASE64},${image}`);
      await updateAvatar(url, userId);
      res.status(201).json({ avatar: url });
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  getProfile = async ({ body: { userId } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const user = await findUser(userId);
      res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default ProfileController;
