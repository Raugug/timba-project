const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Game = require('../models/game');
const Review = require('../models/review');
const passport = require('passport');
const router = express.Router();
const bcryptSalt = 10;
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });


//CREATE GAME
router.get('game/new', ensureLoggedIn(), (req, res, next) => {
  res.render('games/create');
  });

router.post('/new', [ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
    console.log("ENTRA GAME NEW");
    let hostId = req.user._id;
    let photo = `/uploads/${req.file.filename}`;
    let description = req.body.description;
    let playersNum = req.body.playersNum;
    let level = req.body.level;
    let blinds = req.body.blinds;
    let buyIn = req.body.buyIn;
    let date = req.body.date;
    let time = req.body.time;

  Game.create({hostId, playersNum, photo, description, photo, level, blinds, buyIn, date, time})
  .then(game => {
    console.log("CREATED GAME", game);
    res.redirect('/games/');
  }).catch(e =>  next(e))
})

//READ GAME DETAILS



//GAMES LIST
router.get('/list', ensureLoggedIn(), (req, res, next) => {
  Game.find().populate('hostId').then(games => {
    res.render('games/list', {games});
}).catch(e => console.log(e))
})

//UPDATE GAME

module.exports = router;