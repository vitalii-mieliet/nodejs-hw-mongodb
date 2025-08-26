import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

const getAllContatcts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();
  const total = await ContactCollection.find().countDocuments();
  const paginationData = calcPaginationData(total, page, perPage);

  const data = await contactsQuery.skip(skip).limit(limit).exec();

  return {
    data,
    ...paginationData,
  };
};

const getContactById = async (id) => {
  const data = await ContactCollection.findById(id);
  return data;
};

const createContact = async (payload) => {
  const data = await ContactCollection.create(payload);
  return data;
};

const updateContact = async (id, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return result.value;
};

const deleteContact = async (_id) => {
  const data = await ContactCollection.findOneAndDelete({ _id });
  return data;
};

export {
  getAllContatcts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
