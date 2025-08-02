export const paginatedProductsDto = {
  response: (products, success) => {
    return {
      success,
      payload: products.docs,
      total: products.totalDocs,
      totalPages: products.totalPages,
      pagingCounter: products.pagingCounter,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    };
  },
};
