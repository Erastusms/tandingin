const ApiRouter = require("express").Router();
const userController = require("../controllers/UserController");
const validator = require("../middlewares/validate");
const { auth } = require("../middlewares/auth");
const {
  RegisterSchema,
  LoginSchema,
  UpdateUserSchema,
  SearchSchema,
} = require("../validator/UserSchema");
const { ListLeagueSchema } = require("../validator/LeagueSchema");
// const { MulterSingle } = require("../middlewares/multer");

ApiRouter.post(
  "/register",
  validator(RegisterSchema, "body"),
  // MulterSingle("./public/images/avatars/"),
  userController.register
);
ApiRouter.get("/auth/google", userController.loginWithGoogle);
ApiRouter.get("/auth/google/callback", userController.loginSyncWithGoogle);
ApiRouter.post("/login", validator(LoginSchema, "body"), userController.login);
ApiRouter.get("/profile", auth, userController.profilePage);
ApiRouter.put(
  "/profile",
  validator(UpdateUserSchema, "body"),
  auth,
  // MulterSingle("./public/images/avatars/"),
  userController.updateProfile
);
ApiRouter.get(
  "/search",
  validator(SearchSchema, "query"),
  userController.search
);
ApiRouter.get(
  "/league/match/show/:leagueId",
  userController.viewMatchInLeague
);
ApiRouter.get(
  "/league/list/all",
  validator(ListLeagueSchema, "query"),
  userController.viewListLeague
);

ApiRouter.get("/get", userController.getUser);

module.exports = ApiRouter;
