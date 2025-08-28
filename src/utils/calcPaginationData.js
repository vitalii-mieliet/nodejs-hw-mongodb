export const calcPaginationData = (count, page, perPage) => {
  const totalItems = count;
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
