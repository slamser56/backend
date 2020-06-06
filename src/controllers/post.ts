import express from 'express';
import * as logger from '../utils/logger';
import createPost from '../databaseService/post';

class PostController {
  uploadPost = async ({ body: { idUser, text } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!text) {
        res.status(400).send('Please input text');
      }
      await createPost(idUser, text);
      res.status(201).send();
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };
}

export default PostController;
