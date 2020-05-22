import express from 'express';
import moment from 'moment';
import model from '../models';
import * as logger from '../utils/logger';
import cloudinary from '../utils/cloudinary';

class PostController {
  uploadPost = async (
    { body: { idUser, text, images } }: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      await model.post.create({ idUser, text, date: Date() });
      res.status(200).send();
    } catch (error) {
      res.status(500).send();
    }
  };
}

export default PostController;
