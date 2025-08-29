import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';
import {
  ACCESS_TOKEN_TTL_MS,
  REFRESH_TOKEN_TTL_MS,
} from '../constatnts/index.js';

const createSession = (userId) => {
  return {
    userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL_MS),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
  };
};

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) throw createHttpError(409, 'User not found!');
  const hashedPasword = await bcrypt.hash(password, 10);
  return await UserCollection.create({
    ...payload,
    password: hashedPasword,
  });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401, 'Email alredy exist');

  const isEqualPassword = await bcrypt.compare(password, user.password);
  if (!isEqualPassword) throw createHttpError(401, 'Unauthorized');

  await SessionCollection.deleteOne({ userId: user._id });
  const newSession = createSession(user._id);
  return await SessionCollection.create({
    ...newSession,
  });
};
