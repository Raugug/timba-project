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
  const selfc=req.body.vision;  
  const courage=req.body.vision;  
  const sharp=req.body.vision;
  const authorId = req.user._id;
  Review.create({ownerId: owner, authorId, vision, selfc, courage, sharp})
  .then(() => {

    Review.find({ownerId: owner})
    .then(reviews => {
      console.log("LEVEL", reviews);
      let level=(reviews.reduce((acc, e) => acc+e.view+e.courage+e.selfc+e.sharp, 0)/reviews.length/4).toFixed();
              //(reviews.reduce((acc, e) =>  acc + e.prop1 + e.prop2 + e.prop3 + e.prop4 + e.prop5 + e.prop6, 0) /reviews.length /  6  ).toFixed(2);
      let vis=(reviews.reduce((acc, e) => acc+e.view, 0)/reviews.length).toFixed(1);
      let cour=(reviews.reduce((acc, e) => acc+e.courage, 0)/reviews.length).toFixed(1);
      let self=(reviews.reduce((acc, e) => acc+e.selfc, 0)/reviews.length).toFixed(1);
      let shar=(reviews.reduce((acc, e) => acc+e.sharp, 0)/reviews.length).toFixed(1);
  

  
      User.findByIdAndUpdate(owner, {level: level, vision: vis, courage: cour, selfControl: self, sharp: shar})
      .then (player =>{
        res.render('user/myprofile')
      }).catch(e => console.log(e))
    }).catch(e => console.log(e))
  }).catch(e => console.log(e))
}).catch(e => console.log(e))













/* 
Places.findById(placeId, (err, place) => {
  if (err) {
    return next(err);
  }
  Review.find({ place: placeId }, (err, reviews) => {
    if(err)console.log(err);
    let num_stars = (
      reviews.reduce(
        (acc, e) =>
          acc + e.prop1 + e.prop2 + e.prop3 + e.prop4 + e.prop5 + e.prop6,
        0
      ) /
      reviews.length /
      6
    ).toFixed(2);
    let comment = reviews;
    res.render("place/detail", { place: place, stars: num_stars, comment });
  });
});
}); */



module.exports = router;