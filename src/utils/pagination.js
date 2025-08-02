import CONFIG from './config.js';

const buildPaginationOptions = (query) => {
  if (query.limit || query.page || query.sort) {
    const limit = parseInt(query.limit) || CONFIG.DEFAULT_PAGINATION_LIMIT;
    const page = parseInt(query.page) || CONFIG.DEFAULT_PAGINATION_PAGE;
    const sort = query.sort ? { price: query.sort === 'asc' ? 1 : -1 } : {};
    return { limit, page, sort };
  }
  return null;
};

const addNavigationLinks = (data, dataPath, query) => {
  const queryParams = new URLSearchParams(query);
  queryParams.delete('page');
  const baseQuery = queryParams.toString() ? `&${queryParams}` : '';
  data.prevLink = data.hasPrevPage
    ? `${CONFIG.BASE_URL}/${dataPath}?page=${data.prevPage}${baseQuery}`
    : null;
  data.nextLink = data.hasNextPage
    ? `${CONFIG.BASE_URL}/${dataPath}?page=${data.nextPage}${baseQuery}`
    : null;
};

export { buildPaginationOptions, addNavigationLinks };
