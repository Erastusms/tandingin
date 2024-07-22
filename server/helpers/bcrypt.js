const bcrypt = require("bcryptjs");

const saltRound = +process.env.SALT_ROUND || 7;

const encrypter = (pwd) => bcrypt.hashSync(pwd, saltRound);

const decrypter = (pwd, hashPwd) => bcrypt.compareSync(pwd, hashPwd);

module.exports = {
  encrypter,
  decrypter,
};
