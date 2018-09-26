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


// Get Profile User
router.get('/:userId', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.params.userId)
  .then(player => {
    res.render('user/profile', {player});
  }).catch(e => next(e))
});


// Get Players List
router.get('/list/:userId', ensureLoggedIn(), (req, res, nest) => {
  User.find().then(players => {
    console.log( `la lista tiene' ${players.length} jugadores`)
    res.render('user/playerList', {players, list: 'listado de players'})
  }).catch(e => next(e))
});

// Get Graph User 
router.get('/graphuser/:userId', ensureLoggedIn(), (req, res, nest) => {
  User.findById(req.params.userId).then(player => {
    console.log( `Grafico del player' ${player.username}`)
    res.render('user/playerGraph', {
      player, 
      playerStr: JSON.stringify(player)
    })
  }).catch(e => next(e))
});

//Edit User

router.get('/edituser/:userId', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.params.userId)
  .then(player => {
    res.render('user/editProfile', {player});
  }).catch(e => next(e))
});

router.post('/edituser/:userId', ensureLoggedIn(), (req, res, next)=> {
  let {username, email} = req.body;
  User.findByIdAndUpdate(req.params.userId, {username, email})
  .then(()=> res.redirect('/'))
  .catch(err => next(err))
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