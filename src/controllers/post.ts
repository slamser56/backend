import express from 'express';
import * as logger from '../utils/logger';
import { createPost, findPosts } from '../databaseService/post';

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

  getPosts = async ({ body: { idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const posts = await findPosts(idUser);
      res.status(200).json({ data: posts.map((value) => ({ text: value.text, date: value.date })) });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };
}

export default PostController;
