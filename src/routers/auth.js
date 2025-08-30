import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema, loginUserSchema } from '../validation/users.js';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
