import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema } from '../validation/users.js';
import { registerUserController } from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
