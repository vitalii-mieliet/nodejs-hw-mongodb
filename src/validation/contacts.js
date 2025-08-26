import Joi from 'joi';
import { CONTACT_TYPE, EMAIL_REGEX } from '../constatnts/contacts.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().pattern(EMAIL_REGEX).messages({
    'string.pattern.base': 'Invalid email format.',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .required()
    .messages({
      'any.only':
        'Contact type should be on of the valid types ("work", "home" or "personal").',
      'any.required': 'Contact type is required.',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().messages(),
  email: Joi.string().pattern(EMAIL_REGEX).messages({
    'string.pattern.base': 'Invalid email format.',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .messages({
      'any.only':
        'Contact type should be on of the valid types ("work", "home" or "personal").',
    }),
});
