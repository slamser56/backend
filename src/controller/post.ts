import dotenv from 'dotenv';
import express from 'express';
import model from '../model';
import cloudinary from '../utils/cloudinary';

dotenv.config();

class PostController {
  uploadPost = async ({
    body: {
      _id, text, date, images,
    },
  }: express.Request, res: express.Response): Promise<express.Response> => {
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
  };
}

export default PostController;
