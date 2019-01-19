const sendError = (message) => {
  throw new Error(message);
};

module.exports = sendError;
