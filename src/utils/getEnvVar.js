import 'dotenv/config';

const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];

  if (value) return value;
  if (!value && defaultValue) return defaultValue;
  throw new Error(`Missing variable ${name}`);
};

export default getEnvVar;
