const AdminRouter = require('express').Router();
const adminController = require('../controllers/AdminController');
const validator = require('../middlewares/validate');
const { checkAuth } = require('../middlewares/auth');
const { CreateSchema, ApprovalSchema, ListSchema  } = require('../validator/LeagueSchema');
const { MulterSingle } = require('../middlewares/multer');
// const upload = multer({ dest: 'uploads/' })
AdminRouter.post(
  '/league',
  validator(CreateSchema, 'body'),
  checkAuth('admin'),
  MulterSingle('./public/images/league'),
  adminController.create
);
AdminRouter.put(
  '/league/:leagueId',
  MulterSingle('./public/images/league'),
  checkAuth('admin'),
  validator(CreateSchema, 'body'),
  adminController.update
);
AdminRouter.put(
  '/league/logo/:leagueId',
  MulterSingle('./public/images/league'),
  checkAuth('admin'),
  adminController.updateLogo
);
AdminRouter.get('/league/list/all', adminController.viewListLeague);
AdminRouter.get(
  '/league/list',
  validator(ListSchema, 'query'),
  adminController.viewListTeamInLeague
);
AdminRouter.put(
  '/league/approval/status',
  checkAuth('admin'),
  validator(ApprovalSchema, 'body'),
  adminController.updateStatus
);
// AdminRouter.get(
//   '/league/match/generate/:leagueId',
//   checkAuth('admin'),
//   // validator(ApprovalSchema, 'body'),
//   adminController.updateStatus
// );

module.exports = AdminRouter;
