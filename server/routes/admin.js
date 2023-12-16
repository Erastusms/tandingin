const AdminRouter = require("express").Router();
const adminController = require("../controllers/AdminController");
const validator = require("../middlewares/validate");
const { adminAuth } = require("../middlewares/auth");
const { CreateSchema } = require("../validator/LeagueSchema");
const { MulterSingle } = require("../middlewares/multer");

AdminRouter.post(
  "/league",
  validator(CreateSchema, 'body'),
  adminAuth,
  MulterSingle("./public/league/images/"),
  adminController.create
);
AdminRouter.put(
  "/league/:leagueId",
  validator(CreateSchema, 'body'),
  adminAuth,
  adminController.update
);
AdminRouter.put(
  "/league/logo/:leagueId",
  adminAuth,
  MulterSingle("./public/league/images/"),
  adminController.updateLogo
);
AdminRouter.get('/league/list', adminController.viewListLeague)
// AdminRouter.get("/auth/google", adminController.loginWithGoogle);
// AdminRouter.get("/auth/google/callback", adminController.loginSyncWithGoogle);
// AdminRouter.post("/login", validator(LoginSchema, 'body'), adminController.login);
// AdminRouter.get("/profile", auth, adminController.profilePage);


// AdminRouter.get("/get", userController.getUser);

module.exports = AdminRouter;
