const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Game = require('../models/game');
const Request = require('../models/review');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');