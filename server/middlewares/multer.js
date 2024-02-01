const multer = require('multer');

const MulterSingle = (dest) => {
  const storage = multer.diskStorage({
    destination: `${dest}`,
    filename: (req, file, cb) => {
      // const { access_token } = req.headers;
      // let name;

      // if (access_token) {
      //   const decoded = tokenVerifier(access_token);
      //   name = decoded.username.substr(0,3).toUpperCase()
      // } else {
      //   name = "user";
      // }

      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({
    storage,
  });

  return upload.single('file');
};

module.exports = { MulterSingle };
