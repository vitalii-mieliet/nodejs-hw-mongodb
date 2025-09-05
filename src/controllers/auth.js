import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../services/auth.js';

const setupSession = (res, data) => {
  res.cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    expires: data.refreshTokenValidUntil,
  });

  res.cookie('sessionId', data._id, {
    httpOnly: true,
    expires: data.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const data = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully registered a user!`,
    data,
  });
};

export const loginUserController = async (req, res) => {
  const data = await loginUser(req.body);

  setupSession(res, data);

  res.status(200).json({
    status: 200,
    message: `Successfully logged in a user!`,
    data: {
      accessToken: data.accessToken,
    },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const data = await refreshUserSession(req.cookies);

  setupSession(res, data);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: data.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) await logoutUser(req.cookies.sessionId);
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};
