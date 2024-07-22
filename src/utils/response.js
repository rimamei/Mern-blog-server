export const response = (res, data, code, message) => {
  const result = {
    code,
    message,
    data,
  };

  res.status(code).json(result);
};
