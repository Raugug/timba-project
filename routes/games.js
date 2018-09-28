const express = require('express');
const User = require('../models/user');
const Game = require('../models/game');
const Review = require('../models/review');
const Usergame = require('../models/usergames');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
//const multer = require('multer');
const uploadCloud = require('../config/cloudinary.js');


//CREATE GAME
router.get('/new', ensureLoggedIn(), (req, res, next) => {
  res.render('games/create');
  });

router.post('/new', [ensureLoggedIn(), uploadCloud.single('photo')], (req, res, next) => {
    console.log("ENTRA GAME NEW");
    let date = req.body.date.substring(0, 12);
    let hostId = req.user._id;
    let photo = req.file.url;
    let description = req.body.description;
    let playersNum = req.body.playersNum;
    let level = req.body.level;
    let blinds = req.body.blinds;
    let buyIn = req.body.buyIn; 
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

//GAME LIST BY HOST
router.get('/hostlist', ensureLoggedIn(), (req, res, next) => {
  Game.find({hostId: req.user._id}).populate('hostId').then(games => {
    let hosting= true;
    let user = req.user;
    res.render('games/list', {games, hosting, user});
}).catch(e => console.log(e))
})

//GAME DETAIL
router.get('/:gameId', ensureLoggedIn(), (req, res, next) => {
  Game.findById(req.params.gameId).populate('hostId').populate('players')
    .then(game => {
      Usergame.find({gameId:game._id, userId: req.user._id}).populate('gameId').then(usergame => {
        console.log("HERE: USERGAME ALREADY IN GAME", usergame);
        let imHost= false;
        if (game.hostId == req.user._id){imHost = true;} 
        let user = req.user;
        res.render('games/show', { usergame, game, user, imHost,
          gameStr: JSON.stringify(game) })
        })
    }).catch(e => console.log(e))
})

//ADD USER TO GAME
router.post('/add/:gameId', ensureLoggedIn(), (req, res, next) => {
  console.log("ENTRA EN POST")
  let userId = req.user._id;
    console.log("user id",req.user._id);
      User.findByIdAndUpdate(req.user._id, {$push: {games: req.params.gameId}}).then(()=>{

        Game.findByIdAndUpdate(req.params.gameId, {$push: {players: userId}}).populate('players').then(game => {
         Usergame.create({gameId: game._id, userId: req.user._id}).then((usergame)=>{console.log("usergame created", usergame);
        
         let stringId = encodeURIComponent(game._id);
         res.redirect(`/game/${stringId}`);
        })
         
       })
      })
})
//DELETE USER FROM GAME
router.post('/delete/:gameId', ensureLoggedIn(), (req, res, next) => {
  console.log("ENTRA EN POST DELETE")
  let userId = req.user._id;
    User.findByIdAndUpdate(req.user._id, {$pull: {games: req.params.gameId}}).then(()=>{

      Game.findByIdAndUpdate(req.params.gameId, {$pull: {players: userId}}).populate('players').then(game => {
        console.log("GAME:", game);
        Usergame.deleteOne({gameId: game._id, userId: req.user._id}).then((usergame)=>{console.log("usergame DELETED", usergame)
      
        let stringId = encodeURIComponent(game._id);
        res.redirect(`/game/${stringId}`);
      })
      });


    })

})

//DELETE GAME
router.get("/remove/:gameId", (req, res) => {

  Game.findByIdAndRemove(req.params.gameId, (err, game) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
});


//////////// HOST /////////////
// UPDATE GAME
router.post('/ready/:gameId', ensureLoggedIn(), (req, res, next) =>{
  Game.findByIdAndUpdate(req.params.gameId, {ready: true, joining: false}).populate('players').then(game =>{
    let stringId = encodeURIComponent(game._id);
    res.redirect(`/game/${stringId}`);
  })
})
router.post('/close/:gameId', ensureLoggedIn(), (req, res, next) =>{
  Game.findByIdAndUpdate(req.params.gameId, {closed: true, ready: false}).populate('players').then(game =>{
    let stringId = encodeURIComponent(game._id);
    res.redirect(`/game/${stringId}`);
  })
})
router.post('/joining/:gameId', ensureLoggedIn(), (req, res, next) =>{
  Game.findByIdAndUpdate(req.params.gameId, {ready: false, joining: true}).populate('players').then(game =>{
    let stringId = encodeURIComponent(game._id);
    res.redirect(`/game/${stringId}`);
  })
})

module.exports = router;