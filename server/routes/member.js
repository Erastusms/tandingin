const MemberRouter = require("express").Router();
const memberController = require("../controllers/MemberController");
const validator = require("../middlewares/validate");
const { memberAuth } = require("../middlewares/auth");
const { CreateSchema } = require("../validator/TeamSchema");
const { MulterSingle } = require("../middlewares/multer");

MemberRouter.post(
  "/team/:LeagueId",
  validator(CreateSchema, 'body'),
  memberAuth('member'),
  MulterSingle("./public/league/images/"),
  memberController.create
);

module.exports = MemberRouter;
