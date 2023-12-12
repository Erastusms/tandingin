const ApiRouter = require("express").Router();
const SignInSignUp = require("../controllers/SignInSignUp");
const validator = require("../middlewares/validate");
const { RegisterSchema } = require("../validator/RegisterSchema");
// const { MulterSingle } = require("../middlewares/multer");
// const { auth } = require("../middlewares/auth");

ApiRouter.post(
  "/register",
  validator(RegisterSchema, 'body'),
  // MulterSingle("./public/images/avatars/"),
  SignInSignUp.register
);
ApiRouter.get("/auth/google", SignInSignUp.loginWithGoogle);
ApiRouter.get("/auth/google/callback", SignInSignUp.loginSyncWithGoogle);
ApiRouter.post("/login", SignInSignUp.login);
ApiRouter.get("/get", SignInSignUp.getUser);

module.exports = ApiRouter;
