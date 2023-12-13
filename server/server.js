require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
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
console.log(`Server is running in port: http://localhost:5000`);
// app.listen(port, () => {
//     console.log(`Server is running in port: http://localhost:${port}`);
// });
app.listen(port, "0.0.0.0");