import dotenv from 'dotenv';
import express from 'express';
import moment from 'moment';
import model from '../models';
import * as logger from '../utils/logger';
import cloudinary from '../utils/cloudinary';

dotenv.config();

class PostController {
  uploadPost = async (
    { body: { idUser, text, images } }: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    try {
      const date = new Date();
      await model.post.create({ idUser, text, date });
      return res.status(200).send();
    } catch (err) {
      return res.status(500).send();
    }
  };
}

export default PostController;
