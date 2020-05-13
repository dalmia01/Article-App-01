const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const config = require('./database');
const Users = require('../models/users');

module.exports = function(passport){
  passport.use(new LocalStrategy(function(username,password,done){
    let query = {username:username};
    Users.findOne(query,function(err,user){
      if(err){
        console.log('Error Occured - passport js file ', err);
        return done(err);
      }
      if(!user){
        console.log('No User Found');
        return done(null,false,{message:'Incorrect username'})
      }

      bcrypt.compare(password,user.password,function(err,isMatch){
        if(isMatch){
          return done(null,user);
        }else{
          return done(null,false,{message:'Incorrect password'});
        }
      });

    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

}
