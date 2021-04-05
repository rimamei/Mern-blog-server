exports.createProduct = (req, res, next) => {
  res.json({
    message: "Create Product Success",
    data: {
      id: 1,
      name: "Sari Roti",
      price: 8000,
    },
  });
  next();
};

exports.getAllProduct = (req, res, next) => {
  res.json({
    message: "Get All Product Success",
    data: {
      id: 1,
      name: "Sari Roti",
      price: 8000,
    },
  });
  next();
};
