const express = require('express');
const User = require('../models/user');
const Game = require('../models/game');
const Review = require('../models/review');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//CREATE REVIEW

router.get('/:userId', ensureLoggedIn(), (req, res, next) => {
      owner= req.params.userId;
      User.findById(owner)
      .then(owner => {
        
        res.render('review/create', {owner})
      }).catch(e => console.log(e))  
      
  })

//POST REVIEW
router.post('/create/:userId', ensureLoggedIn(), (req, res, next) =>{
  const owner=req.params.userId;
  const vision=req.body.vision;  
  const selfc=req.body.selfc;  
  const courage=req.body.courage;  
  const sharp=req.body.sharp;
  const authorId = req.user._id;
  Review.create({ownerId: owner, authorId, vision, selfc, courage, sharp})
  .then(() => {

    Review.find({ownerId: owner})
    .then(reviews => {
      let level=(reviews.reduce((acc, e) => acc+e.vision+e.courage+e.selfc+e.sharp, 0)/reviews.length/4).toFixed(1);
      let vis=(reviews.reduce((acc, e) => acc+e.vision, 0)/reviews.length).toFixed(1);
      let cour=(reviews.reduce((acc, e) => acc+e.courage, 0)/reviews.length).toFixed(1);
      let self=(reviews.reduce((acc, e) => acc+e.selfc, 0)/reviews.length).toFixed(1);
      let shar=(reviews.reduce((acc, e) => acc+e.sharp, 0)/reviews.length).toFixed(1);
      console.log("CALCULOS",level, vis, cour, self, shar);
  

  
      User.findByIdAndUpdate(owner, {level: level, vision: vis, courage: cour, selfControl: self, sharp: shar})
      .then (player =>{
        res.redirect('/player/list')
      }).catch(e => console.log(e))
    }).catch(e => console.log(e))
  }).catch(e => console.log(e))
})

module.exports = router;