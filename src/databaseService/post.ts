import model from '../models';

const createPost = async (idUser: string, text: string): Promise<void> => {
  await model.post.create({ idUser, text, date: Date() });
};

export default createPost;
