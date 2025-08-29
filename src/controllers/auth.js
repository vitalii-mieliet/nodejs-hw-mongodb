import { loginUser, registerUser } from '../services/auth.js';

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
    message: `Successfully logged in an user!`,
    data: {
      accessToken: data.accessToken,
    },
  });
};
