import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import getEnvVar from './utils/getEnvVar.js';
import { getAllContatcts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const data = await getAllContatcts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (!data) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id '${contactId}'!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is runing on port: ${PORT}`);
  });
};

export default setupServer;
