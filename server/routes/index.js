const router = require("express").Router();
const apiRouter = require("./api");
const adminRouter = require("./admin");
const memberRouter = require("./member");

router.use("/api/v1", apiRouter);
router.use("/admin", adminRouter);
router.use("/member", memberRouter);

module.exports = router;
