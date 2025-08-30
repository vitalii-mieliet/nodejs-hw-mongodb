import createHttpError from 'http-errors';
import { authenticateUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  //   req.get('Authorization');
  console.log(authorization);

  if (!authorization)
    throw createHttpError(401, 'Please provide Authorization header!');

  const [bearer, accessToken] = authorization.split(' ');

  if (bearer !== 'Bearer' || !accessToken)
    throw createHttpError(401, 'Auth header should be of type Bearer!');

  req.user = await authenticateUser(accessToken);
  next();
};
