module.exports = {
  successResponse(responseMessage, data = undefined) {
    return {
      status: 'success',
      message: responseMessage,
      data,
    };
  },
};
