const router = require("express").Router();
const apiRouter = require("./api");
const adminRouter = require("./admin");

router.use("/api/v1", apiRouter);
router.use("/admin", adminRouter);

module.exports = router;
