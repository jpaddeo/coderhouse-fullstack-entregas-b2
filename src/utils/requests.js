const validateRequiredFields = (product, requiredFields) => {
  if (!product || typeof product !== 'object') return false;

  const missingFields = requiredFields.filter((field) => !product[field]);

  return missingFields.length === 0;
};

export { validateRequiredFields };
