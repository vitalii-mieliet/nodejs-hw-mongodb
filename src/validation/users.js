import Joi from 'joi';
import { EMAIL_REGEX } from '../constatnts/index.js';

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    'string.pattern.base': 'Invalid email format.',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required',
  }),
});
