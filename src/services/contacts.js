import { SORT_ORDER } from '../constatnts/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

const getAllContatcts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find({ userId });

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const total = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calcPaginationData(total, page, perPage);
  return {
    data,
    ...paginationData,
  };
};

const getContact = async (query) => {
  const data = await ContactCollection.findOne(query);
  return data;
};

const createContact = async (payload) => {
  const data = await ContactCollection.create(payload);
  return data;
};

const updateContact = async (query, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(query, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return result.value;
};

const deleteContact = async (query) => {
  const data = await ContactCollection.findOneAndDelete(query);
  return data;
};

export {
  getAllContatcts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
