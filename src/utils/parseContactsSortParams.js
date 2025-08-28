import { SORT_ORDER } from '../constatnts/index.js';

const parseSortOrder = (value) => {
  if (typeof value !== 'string') return;
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(value);
  if (isKnownOrder) return value;

  return SORT_ORDER.ASC;
};

const parseSortBy = (value) => {
  if (typeof value !== 'string') return;
  const keysOfContacts = ['_id', 'name'];
  if (keysOfContacts.includes(value)) return value;
  return '_id';
};

export const parseContactsSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
