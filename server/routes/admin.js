const AdminRouter = require('express').Router();
const adminController = require('../controllers/AdminController');
const validator = require('../middlewares/validate');
const { checkAuth } = require('../middlewares/auth');
const { CreateSchema, ApprovalSchema, ListSchema  } = require('../validator/LeagueSchema');
const { MulterSingle } = require('../middlewares/multer');

AdminRouter.post(
  '/league',
  validator(CreateSchema, 'body'),
  checkAuth('admin'),
  MulterSingle('./public/images/league'),
  adminController.create
);
AdminRouter.put(
  '/league/:leagueId',
  validator(CreateSchema, 'body'),
  checkAuth('admin'),
  adminController.update
);
AdminRouter.put(
  '/league/logo/:leagueId',
  checkAuth('admin'),
  MulterSingle('./public/images/league'),
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

module.exports = AdminRouter;
