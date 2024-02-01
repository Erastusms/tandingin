const jwt = require('jsonwebtoken');

const secretCode = process.env.SECRET_CODE;

const tokenGenerator = (user) => {
  const { id, fullname, username, email, password, role } = user;
  const token = jwt.sign(
    {
      id, fullname, username, email, password, role
    },
    secretCode
  );
  return token;
};

const tokenVerifier = (token) => {
  const decoded = jwt.verify(token, secretCode);
  return decoded;
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
