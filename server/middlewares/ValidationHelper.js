const failActionHandler = (request, reply, source, error) => {

  error.output.payload = {
    status: false,
    error: ''
  };

  const err = error && error.data && error.data.details && error.data.details[0];
  const { context: { limit, key, valids } } = err;

  switch (err.type) {
    case 'object.base':
      key === 'value' ? error.output.payload.error = 'Payload can not be empty' : error.output.payload.error = `${key} must be an object`;
      break;
    case 'any.required':
      error.output.payload.error = err.path + ' is required';
      break;
    case 'date.base':
      error.output.payload.error = err.path + ' must be valid date format';
      break;
    case 'number.min':
      error.output.payload.error = err.path + ' has exceed or below the minimum value';
      break;
    case 'number.max':
      error.output.payload.error = err.path + ' has exceed the maximum value';
      break;
    case 'number.base':
      error.output.payload.error = err.path + ' must be valid number';
      break;
    case 'object.missing':
      error.output.payload.error = 'Please fill filter before search';
      break;
    case 'date.min':
      error.output.payload.error = 'End Date must be greater or equal than Start Date';
      break;
    case 'date.isoDate':
      error.output.payload.error = err.path + ' must be valid ISO format';
      break;
    case 'string.min':
      error.output.payload.error = `${key} length must be at least ${limit} characters`;
      break;
    case 'string.max':
      error.output.payload.error = `${key} length must be less than or equal to ${limit} characters`;
      break;
    case 'any.empty':
      error.output.payload.error = `${key} must be filled`;
      break;
    case 'any.allowOnly':
      error.output.payload.error = `${key} must be one of ${valids}`;
      break;
    case 'array.base':
      error.output.payload.error = `${key} must be an array`;
      break;
    case 'boolean.base':
      error.output.payload.error = `${key} must be a boolean`;
      break;
    case 'object.allowUnknown':
      error.output.payload.error = `${key} attribute is not allowed`;
      break;
    case 'any.unknown':
      error.output.payload.error = `${key} parameter must be empty`;
      break;
    case 'string.alphanum':
      error.output.payload.error = `${key} value is invalid`;
      break;
    case 'string.regex.base':
      error.output.payload.error = `${key} value is invalid`;
      break;
    default:
      console.log(err);
      error.output.payload.error = err;
  }

  reply(error);
};

module.exports = {
  failActionHandler,
};