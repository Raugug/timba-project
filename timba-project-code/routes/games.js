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
router.get('/new', ensureLoggedIn(), (req, res, next) => {
  res.render('games/create');
  });

router.post('/new', [ensureLoggedIn(), upload.single('photo')], (req, res, next) => {
    console.log("ENTRA GAME NEW");
    let date ='YYYY-MM-DD'
    let hostId = req.user._id;
    let photo = `/uploads/${req.file.filename}`;
    let description = req.body.description;
    let playersNum = req.body.playersNum;
    let level = req.body.level;
    let blinds = req.body.blinds;
    let buyIn = req.body.buyIn;
    date = req.body.date;
    let time = req.body.time;
    let location = {
      type: 'Point',
      coordinates: [Number(req.body.latitude), Number(req.body.longitude)]
    }
  
  Game.create({hostId, playersNum, photo, description, photo, level, blinds, buyIn, date, time, location})
  .then(game => {
    console.log("GAME CREATED", game);
    res.redirect('/game/list');
  }).catch(e =>  next(e))
})

//GAMES LIST
router.get('/list', ensureLoggedIn(), (req, res, next) => {
  Game.find().populate('hostId').then(games => {
    res.render('games/list', {games});
}).catch(e => console.log(e))
})

//READ GAME DETAILS
router.get('/:gameId', ensureLoggedIn(), (req, res, next) => {
  Game.findById(req.params.gameId).populate('hostId').populate('players').then(game => {
    //User.find().populate('authorId')
    console.log(game)
    return game;
  })
    .then(game => {
      res.render('games/show', { game,
        gameStr: JSON.stringify(game) })
    }).catch(e => console.log(e))
})

//UPDATE GAME

module.exports = router;