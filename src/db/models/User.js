import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from '../hooks.js';
import { EMAIL_REGEX } from '../../constatnts/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: EMAIL_REGEX,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

export const UserCollection = model('users', userSchema);
