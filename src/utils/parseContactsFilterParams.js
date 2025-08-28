import { CONTACT_TYPE } from '../constatnts/contacts.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
};

const parseContactType = (value) => {
  if (typeof value !== 'string') return;
  if (CONTACT_TYPE.includes(value)) return value;
};

export const parseContactsFilterParams = ({
  name,
  isFavourite,
  contactType,
}) => {
  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
