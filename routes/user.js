const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// Get my Profile
router.get('/myprofile', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id)
  .then(player => {
    let owner= true;
    res.render('user/profile', {player,
      owner, 
      playerStr: JSON.stringify(player)
    });
  }).catch(err => next(err))
});

// View other profile
router.get('/myprofile/:userId', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
  .then(player => {
    res.render('user/profile', {
      player, 
      playerStr: JSON.stringify(player)});
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
  .populate('games').populate('hostId')
  .then(player => {
    console.log(player.games)
    res.render('user/playerGames',{player} )
  }).catch(err => next(err))
});

// Get other Profile User
router.get('/:userId', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.params.userId)
  .then(player => {
    res.render('user/profile', {player});
  }).catch(e => next(e))
});


module.exports = router;