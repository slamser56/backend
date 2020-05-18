import model from '../model';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class profileController {
  async uploadAvatar(req, res) {
    const { image, token } = req.body;
    try {
      const {phoneNumber} = await jwt.verify(token, process.env.SECRET)
      const result = await cloudinary.uploader.upload(
        'data:image/jpeg;base64,' + image,
      );
      await model.phone.updateOne({ phoneNumber }, { avatar: result.url });
      return res.status(200).json({ avatar: result.url });
    } catch (err) {
      return res.status(500).send();
    }
  }

  async getAvatar(req, res) {
    const { token } = req.body;
    try {
      const {phoneNumber} = await jwt.verify(token, process.env.SECRET)
      const { avatar } = await model.phone.findOne({
        phoneNumber,
      });
      if (avatar) {
        return res.status(200).json({ avatar });
      } else {
        return res.status(401).send();
      }
    } catch (err) {
      return res.status(500).send();
    }
  }
}

export default profileController;
