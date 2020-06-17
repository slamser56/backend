import model from '../models';
import { PostInterface, AuthorInterface, ContentInterface } from '../models/post';
import t from '../lang/index';

interface FindPostInterface {
  phoneNumber: number;
  text: string;
  createdAt: Date;
}

export const createPost = async (userId: string, text: string): Promise<PostInterface> => {
  const { _id } = await model.postContent.create({ text });
  const create = await model.post.create({ author: userId, content: _id });
  return create;
};

export const findPosts = async (userId: string): Promise<FindPostInterface[]> => {
  const find = await model.post.find({ isDeleted: false, author: userId }).populate('author').populate('content');
  if (find?.length === 0) {
    return Promise.reject({ status: 404, message: t('message.postsNotFound') });
  }
  const posts = find.map((post: AuthorInterface & ContentInterface) => ({
    phoneNumber: post.author.phoneNumber,
    text: post.content.text,
    createdAt: post.createdAt,
  }));
  return posts;
};

export const deletePost = async (userId: string, postId: string): Promise<void> => {
  await model.post.updateOne({ author: userId, _id: postId }, { isDeleted: true, deletedAt: new Date() });
};
