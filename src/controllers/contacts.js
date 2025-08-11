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
};
