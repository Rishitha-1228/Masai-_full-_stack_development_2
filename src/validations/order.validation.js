export const validateUpdateOrder = (req, res, next) => {
  const { quantity, price, order_status } = req.body;

  // At least one field required
  if (!quantity && !price && !order_status) {
    return res.status(400).json({
      error: 'At least one field (quantity, price, order_status) is required'
    });
  }

  if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
    return res.status(400).json({
      error: 'quantity must be a positive number'
    });
  }

  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    return res.status(400).json({
      error: 'price must be a positive number'
    });
  }

  next();
};
