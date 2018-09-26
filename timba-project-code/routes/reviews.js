const express = require('express');
const User = require('../models/user');
const Game = require('../models/game');
const Review = require('../models/review');
const Usergame = require('../models/usergames');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//CREATE REVIEW

router.get('/:userId', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.params.userId).populate('reviews').then(user =>{
    console.log("PASA 1er find y busca reviews en", user.reviews._id);
    Review.find({_id:user.reviews._id}, {authorId: req.user._id}).populate('authorId').then(review => {
      console.log("ENCUENTRA REVIEW PARA ESE USER:", review)
      res.render('review/edit', {review})
    
    })
    console.log("LLEGA AQUÍ");
    
  }).catch(e => console.log(e))
})

//EDIT REVIEW



module.exports = router;