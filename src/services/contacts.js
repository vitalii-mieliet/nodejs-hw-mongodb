import ContactCollection from '../db/models/Contact.js';

const getAllContatcts = async () => {
  const data = await ContactCollection.find();
  return data;
};

const getContactById = async (contactId) => {
  const data = await ContactCollection.findById(contactId);
  return data;
};

export { getAllContatcts, getContactById };
