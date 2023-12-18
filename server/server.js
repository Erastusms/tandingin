require("dotenv").config();
const express = require("express");
const formData = require("express-form-data");
const app = express();
const os = require("os");
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// union the body and the files
app.use(formData.union());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw())
app.use(cors());
app.use(
    "/assets/images",
    express.static(path.join(__dirname, "/assets/images"))
);
app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello world"
    })
});

const routes = require("./routes");
app.use(routes);

// Custom server error handler
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.message)
        if (!err.statusCode) { err.statusCode = 500 } // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message
        })
    }

    next()
})
app.listen(port, () => {
    console.log('Server is running in port: http://localhost:5000');
});
