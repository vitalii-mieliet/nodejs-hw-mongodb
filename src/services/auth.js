import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/User.js';

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) throw createHttpError(409, 'Email alredy exist');
  const hashedPasword = await bcrypt.hash(password, 10);
  return await UserCollection.create({
    ...payload,
    password: hashedPasword,
  });
};
