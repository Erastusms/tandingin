module.exports = {
  successResponse(res, statusCode, responseMessage, data = undefined) {
    return res.status(statusCode).json({
      status: 'success',
      message: responseMessage,
      data,
    });
  },
};
