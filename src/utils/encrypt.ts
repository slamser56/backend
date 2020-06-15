import bcrypt from 'bcrypt';
import t from '../lang/index';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(3);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      return Promise.reject({ status: 400, message: t('message.inputCorrectUserOrPassword') });
    }
    return match
  } catch (error) {
    return Promise.reject({ status: 400, message: t('message.inputCorrectUserOrPassword') });
  }
};
