const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Game = require('../models/game');
const Review = require('../models/review');
const Usergame = require('../models/usergames');
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
    res.redirect('/game/list');
  }).catch(e =>  next(e))
})

//GAMES LIST
router.get('/list', ensureLoggedIn(), (req, res, next) => {
  Game.find({level: { $lte: req.user.level }}).populate('hostId').then(games => {
    res.render('games/list', {games});
}).catch(e => console.log(e))
})

//GAME DETAIL
router.get('/:gameId', ensureLoggedIn(), (req, res, next) => {
  Game.findById(req.params.gameId).populate('hostId').populate('players')
    .then(game => {
      Usergame.find({gameId:game._id, userId: req.user._id}).populate('gameId').then(usergame => {
        console.log("HERE: USERGAME ALREADY IN GAME", usergame);
    
        res.render('games/show', { usergame, game,
          gameStr: JSON.stringify(game) })
        })
    }).catch(e => console.log(e))
})

//ADD USER TO GAME
router.post('/add/:gameId', ensureLoggedIn(), (req, res, next) => {
  console.log("ENTRA EN POST")
  let userId = req.user._id;
     Game.findByIdAndUpdate(req.params.gameId, {$push: {players: userId}}).populate('players').then(game => {
      Usergame.create({gameId: game._id, userId: req.user._id}).then((usergame)=>{console.log("usergame created", usergame)});

      let stringId = encodeURIComponent(game._id);
      res.redirect(`/game/${stringId}`);
    })
})
//DELETE USER FROM GAME
router.post('/delete/:gameId', ensureLoggedIn(), (req, res, next) => {
  console.log("ENTRA EN POST DELETE")
  let userId = req.user._id;
  //{$pull: {players: {_id: userId}}}
     Game.findByIdAndUpdate(req.params.gameId, {$pull: {players: userId}}).populate('players').then(game => {
       console.log("GAME:", game);
      Usergame.deleteOne({gameId: game._id, userId: req.user._id}).then((usergame)=>{console.log("usergame DELETED", usergame)});

      let stringId = encodeURIComponent(game._id);
      res.redirect(`/game/${stringId}`);
    })
})


//////////// HOST /////////////
//GAME LIST BY HOST

//GET UPDATE GAME

//POST TO READY
//POST TO CLOSED

//POST TO CANCELLED

module.exports = router;