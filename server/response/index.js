module.exports = {
  successResponse(res, responseMessage, statusCode = 200, data = undefined) {
    return res.status(statusCode).json({
      status: "success",
      message: responseMessage,
      data,
    });
  },
};
