

const express = require('express');
const Router = express.Router();
const auth = require('../middlewares/auth').checkAuth;
const validator = require('../middlewares/validator').checkReq;
const eventManager = require('../controllers/index').hook;
const exit = require('../middlewares/exit').exit;


Router.post('/hook', auth, validator, eventManager, exit);
module.exports = Router;
