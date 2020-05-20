import express from 'express';
import dotenv from 'dotenv';
import model from '../model';
import cloudinary from '../utils/cloudinary';

dotenv.config();

class ProfileController {
uploadAvatar = async ({ body: { image, _id } }: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${image}`,
    );
    await model.user.updateOne({ _id }, { avatar: result.url });
    return res.status(200).json({ avatar: result.url });
  } catch (err) {
    return res.status(500).send();
  }
};

  getAvatar = async ({ body: { _id } }: express.Request, res: express.Response): Promise<express.Response> => {
    try {
      const { avatar } = await model.user.findOne({
        _id,
      });
      if (avatar) {
        return res.status(200).json({ avatar });
      }
      return res.status(401).send();
    } catch (err) {
      return res.status(500).send();
    }
  };
}

export default ProfileController;
