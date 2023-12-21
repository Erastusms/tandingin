const MemberRouter = require("express").Router();
const memberController = require("../controllers/MemberController");
const validator = require("../middlewares/validate");
const { checkAuth } = require("../middlewares/auth");
const { CreateSchema, JoinLeagueSchema } = require("../validator/TeamSchema");
const { MulterSingle } = require("../middlewares/multer");

MemberRouter.post(
  "/team",
  MulterSingle("./public/images/team/"),
  checkAuth('member'),
  validator(CreateSchema, 'body'),
  memberController.create
);

MemberRouter.post(
  "/team/join",
  validator(JoinLeagueSchema, 'body'),
  checkAuth('member'),
  memberController.joinLeague
);

module.exports = MemberRouter;
