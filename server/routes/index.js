const router = require("express").Router();
const apiRouter = require("./api");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world"
  })
});

router.use("/api/v1", apiRouter);

module.exports = router;
