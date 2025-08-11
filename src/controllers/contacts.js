import createHttpError from 'http-errors';
import { getAllContatcts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await getAllContatcts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id '${contactId}'!`,
    data,
  });
};
