import model from '../model';
import dotenv from 'dotenv';
dotenv.config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class postController {
  async uploadPost(req, res) {
    const { _id, text, date, images } = req.body;
    try {
      await model.post.updateOne(
        { idUser: _id },
        { idUser: _id, text, date },
        { upsert: true },
      );

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send();
    }
  }
}

export default postController;
