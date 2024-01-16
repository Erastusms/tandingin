const AdminRouter = require('express').Router();
const adminController = require('../controllers/AdminController');
const validator = require('../middlewares/validate');
const { checkAuth } = require('../middlewares/auth');
const { CreateSchema, ApprovalSchema, ListSchema, UpdateScoreSchema } = require('../validator/LeagueSchema');
const { MulterSingle } = require('../middlewares/multer');

AdminRouter.get(
  '/dashboard',
  checkAuth('admin'),
  adminController.viewDashboard
);
AdminRouter.post(
  '/league',
  validator(CreateSchema, 'body'),
  checkAuth('admin'),
  MulterSingle('./public/images/league'),
  adminController.createLeague
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
  adminController.updateLogo,
);
AdminRouter.get('/league/detail/:LeagueId', adminController.viewDetailLeague);
AdminRouter.get('/league/list/all', adminController.viewListLeague);
AdminRouter.get(
  '/league/list',
  validator(ListSchema, 'query'),
  adminController.viewListTeamInLeague
);
AdminRouter.get(
  '/league/list/me',
  checkAuth('admin'),
  adminController.viewListAdminLeague
);
AdminRouter.put(
  '/league/approval/status',
  checkAuth('admin'),
  validator(ApprovalSchema, 'body'),
  adminController.updateStatus
);
AdminRouter.get(
  '/league/match/generate/:leagueId',
  checkAuth('admin'),
  adminController.generateMatch
);
AdminRouter.get(
  '/league/match/show/:leagueId',
  adminController.viewMatchInLeague
);
AdminRouter.put(
  '/league/match/score/:leagueId',
  checkAuth('admin'),
  validator(UpdateScoreSchema, 'body'),
  adminController.updateScore
);
AdminRouter.delete(
  '/league/:id',
  checkAuth('admin'),
  adminController.deleteLeague
);

module.exports = AdminRouter;
