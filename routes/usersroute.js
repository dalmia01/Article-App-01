const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

let Users = require('../models/users');

// User Login - Get Route
router.get('/login',(req,res)=>{
  res.render('user_login');
});

// User Register - Get Route
router.get('/register',(req,res)=>{
  res.render('user_register');
});

// User login - Post Route
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/article',
    failureRedirect:'/user/login'
  })(req,res,next);
});

// User Register - Post Route
router.post('/register',(req,res)=>{
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.password,salt,(err,hash)=>{
      if(err){
        console.log('Error Occured - Hashing password ')
      }else{
        let user = new Users({
          name : req.body.name,
          username : req.body.username,
          email : req.body.email,
          password : hash,
        });

        user.save((err)=>{
          if(err){
            console.log('Error Occured - Registering User');
          }else{
            res.redirect('/user/login');
          }
        });
      }
    });
  });
});

// User Logout - Get Request
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/user/login');
});

module.exports = router;
