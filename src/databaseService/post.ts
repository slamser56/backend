import mongoose from 'mongoose';
import model from '../models';
import { PostInterface } from '../models/post';
import t from '../lang/index';

export const createPost = async (userId: string, text: string): Promise<PostInterface> => {
  const { _id } = await model.postText.create({ text });
  const create = await model.post.create({ userId, postTextId: _id });
  return create;
};

export const findPosts = async (userId: string): Promise<PostInterface[]> => {
  const find = await model.post.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $lookup: { from: 'posttexts', localField: 'postTextId', foreignField: '_id', as: 'text' } },
    { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
    { $unwind: '$text' },
    { $unwind: '$user' },
    { $project: { createdAt: 1, _id: 1, phoneNumber: '$user.phoneNumber', text: '$text.text' } },
  ]);
  if (find.length === 0) {
    return Promise.reject({ status: 404, message: t('message.postsNotFound') });
  }
  return find;
};

export const deletePost = async (userId: string, _id: string): Promise<void> => {
  await model.post.updateOne({ userId, _id }, { deleted: true });
};
