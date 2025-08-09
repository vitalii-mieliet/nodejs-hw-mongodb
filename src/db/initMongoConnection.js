import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@t${url}/${db}?retryWrites=true&w=majority&appName=Testing`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Errot while setting up mongo connection');
    throw error;
  }
};
export default initMongoConnection;
