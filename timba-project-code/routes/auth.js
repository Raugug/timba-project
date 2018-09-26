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

router.get('/signup', ensureLoggedOut(), (req, res, next) => {
  res.render('auth/signup', {
    errorMessage: ''});
  });

  router.post('/signup', [ensureLoggedOut(), upload.single('photoInput')], (req, res, next) => {
    console.log("Entra /post Signup");
    const {
      nameInput,
      emailInput,
      passwordInput,
    } = req.body;
    let photoInput;
    if (req.file != undefined){
      photoInput = `../uploads/${req.file.filename}`}
      else {photoInput = '../uploads/defaultimageuser'}
  
    if (emailInput === '' || passwordInput === '') {
      res.render('auth/signup', {
        errorMessage: 'Enter both email and password to sign up.'
      });
      return;
    }
  
    User.findOne({ emailInput }, '_id', (err, existingUser) => {
      if (err) {
        next(err);
        return;
      }
      if (existingUser !== null) {
        res.render('auth/signup', {
          errorMessage: `The email ${emailInput} is already in use.`
        });
        return;
      }
      /* console.log("PasswordInput",passwordInput); */
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(passwordInput, salt);
      //console.log(hashPass);
      const userSubmission = {
        username: nameInput,
        email: emailInput,
        password: hashPass,
        photo: photoInput
      };
      console.log("userSubmission", userSubmission);
  
      const theUser = new User({
        username: nameInput,
        email: emailInput,
        password: hashPass,
        photo: photoInput
      });
  
      theUser.save((err) => {
        if (err) {
          console.log(err);
          res.render('auth/signup', {
            errorMessage: 'Something went wrong. Try again later.'
          });
          return;
        }
  
        res.redirect('/');
      });
    });
  });
  
  router.get('/login', ensureLoggedOut(), (req, res, next) => {
    res.render('auth/login');
  });
  
  router.post("/login", ensureLoggedOut(), passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
  )
  router.get('/logout', ensureLoggedIn(), (req,res) => {
    req.logout();
    res.redirect('/');
  })

  module.exports = router;