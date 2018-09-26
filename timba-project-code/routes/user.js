const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Review = require('../models/review');
const passport = require('passport');
const router = express.Router();
const bcryptSalt = 10;
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });


// Get my Profile
router.get('/myprofile', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id)
  .then(player => {
    res.render('user/profile', {player});
  }).catch(err => next(err))
});

// View other profile
router.get('/myprofile/:userId', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.params.userId)
  .then(player => {
    res.render('user/otherProfile', {player});
  }).catch(err => next(err))
});


//edit my profile
router.get('/edituser', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id)
  .then(player => {
    res.render('user/editProfile', {player});
  }).catch(err => next(err))
});

//Edit User form /edituser/:userId
router.post('/edituser', ensureLoggedIn(), (req, res, next)=> {
  let {username, email, password} = req.body;
  if (username === '' || email === ''){
    User.findById(req.user._id)
    .then( player => {
      res.render('user/profile', {player, 
        errorMessage: 'Empty field not allowed'
      });
    })
    return;
  }


  User.findByIdAndUpdate(req.user._id, {username, email, password})
  .then(()=> res.redirect('/'))   
  .catch(err => next(err))
});

// Get my Graph User 
router.get('/graphuser', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id).then(player => {
    //console.log( `Grafico del player' ${player.username}`)
    res.render('user/playerGraph', {
      player, 
      playerStr: JSON.stringify(player)
    })
  }).catch(err => next(err))
});

// Get Players List
router.get('/list', ensureLoggedIn(), (req, res, nest) => {
  User.find().then(players => {
    console.log( `la lista tiene' ${players.length} jugadores`)
    res.render('user/playerList', {players, list: 'listado de players'})
  }).catch(e => next(e))
});

// Get my Games List
router.get('/mylist', ensureLoggedIn(), (req, res, next) =>{
  User.findById(req.user._id)
  .populate('games')
  .then(player => {
    console.log(player.games)
    res.render('user/playerGames',{player} )
  }).catch(err => next(err))
});

//{games:player.games}



// Get other Profile User
router.get('/:userId', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.params.userId)
  .then(player => {
    res.render('user/profile', {player});
  }).catch(e => next(e))
});







// router.post("/login", ensureLoggedOut(), passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// })
// )
// router.get('/logout', ensureLoggedIn(), (req,res) => {
//   req.logout();
//   res.redirect('/');
// })






module.exports = router;