import express from 'express';
import { get } from 'lodash';
import * as logger from '../utils/logger';
import { createPost, findPosts } from '../databaseService/post';
import { t } from '../lang';

class PostController {
  uploadPost = async ({ body: { idUser, text } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!text) {
        res.status(400).send(t('message.pleaseInputText'));
      }
      await createPost(idUser, text);
      res.status(201).send();
    } catch (error) {
      logger.error(error);
      get(error, 'status')
        ? res.status(error.status).send(error.message)
        : res.status(500).send(t('message.somethingWrong'));
    }
  };

  getPosts = async ({ body: { idUser } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const posts = await findPosts(idUser);
      res.status(200).json({ data: posts.map((value) => ({ text: value.text, date: value.date })) });
    } catch (error) {
      logger.error(error);
      get(error, 'status')
        ? res.status(error.status).send(error.message)
        : res.status(500).send(t('message.somethingWrong'));
    }
  };
}

export default PostController;
