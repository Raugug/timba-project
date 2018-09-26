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

    Review.find({$and:[{authorId:req.user._id}, {ownerId: req.params._id}]})
    .then(review => {
      console.log("EXISTE REVIEW", review);
      User.findById(req.params.userId)
      .then((owner) => {
        let author = req.user;
        console.log(owner)
        res.render('review/edit', {review, owner, author})
      })
    }).catch(e => console.log(e))
})

//EDIT REVIEW



module.exports = router;