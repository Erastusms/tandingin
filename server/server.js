require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(cors());
app.use(
  '/assets/images',
  express.static(path.join(__dirname, '/assets/images'))
);
app.use(express.static('public'));

app.get('/', (req, res) => res.status(200).json({
  message: 'Hello world'
}));

const routes = require('./routes');

app.use(routes);

// Custom server error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    // Set 500 server code error if statuscode not set
    if (!err.statusCode) { err.statusCode = 500; }
    console.log(err);
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message // buat handle error sama semua messagenya
    });
  }

  return next();
});

app.listen(port, () => {
  console.log('Server is running in port: http://localhost:5000');
});
