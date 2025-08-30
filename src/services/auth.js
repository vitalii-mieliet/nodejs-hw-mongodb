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

export const refreshUserSession = async ({ refreshToken, sessionId }) => {
  const data = await SessionCollection.findOne({
    refreshToken,
    _id: sessionId,
  });

  if (!data) throw createHttpError(401, 'Session not found!');

  await SessionCollection.findByIdAndDelete(data._id);

  if (data.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired!');
  }
  const newSession = createSession(data.userId);

  return await SessionCollection.create({
    ...newSession,
  });
};

export const logoutUser = (sessionId) =>
  SessionCollection.findByIdAndDelete(sessionId);

export const authenticateUser = async (accessToken) => {
  const session = await SessionCollection.findOne({ accessToken });

  if (!session) throw createHttpError(401, 'Session not found!');

  if (new Date() > session.accessTokenValidUntil)
    throw createHttpError(401, 'Access token expired!');

  const user = await UserCollection.findById(session.userId);
  if (!user) throw createHttpError(401, 'User not found!');

  return user;
};
