import express from 'express';
import * as logger from '../utils/logger';
import { createPost, findPosts, deletePost } from '../databaseService/post';
import t from '../lang/index';

class PostController {
  uploadPost = async ({ body: { userId, text } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!text) {
        throw { status: 400, message: t('message.pleaseInputText') };
      }
      const post = await createPost(userId, text);
      res.status(201).send(post);
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  getPosts = async ({ body: { userId } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const posts = await findPosts(userId);
      res.status(200).json(posts);
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  deletePost = async ({ body: { userId, idPost } }: express.Request, res: express.Response): Promise<void> => {
    try {
      await deletePost(userId, idPost);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default PostController;
