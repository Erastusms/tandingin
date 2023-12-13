const ApiRouter = require("express").Router();
const userController = require("../controllers/UserController");
const validator = require("../middlewares/validate");
const { auth } = require("../middlewares/auth");
const { LoginSchema } = require("../validator/LoginSchema");
const { RegisterSchema } = require("../validator/RegisterSchema");
// const { MulterSingle } = require("../middlewares/multer");

ApiRouter.post(
  "/register",
  validator(RegisterSchema, 'body'),
  // MulterSingle("./public/images/avatars/"),
  userController.register
);
// ApiRouter.get("/auth/google", userController.loginWithGoogle);
// ApiRouter.get("/auth/google/callback", userController.loginSyncWithGoogle);
ApiRouter.post("/login", validator(LoginSchema, 'body'), userController.login);
ApiRouter.get("/profile", userController.profilePage);
ApiRouter.put(
  "/profile",
  auth,
  // MulterSingle("./public/images/avatars/"),
  userController.updateProfile
);


ApiRouter.get("/get", userController.getUser);

module.exports = ApiRouter;
