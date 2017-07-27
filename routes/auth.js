const express = require('express');
const router = express.Router();
const GitHubStrategy = require('passport-github2');
const passport = require('passport');
const User = require('../models/user.model');
const Venue = require('../models/venue.model');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(obj, done){
    done(null, obj);
});

//Passport setup
passport.use(new GitHubStrategy({
    clientID: "e5b156bfabd594e3ce1e",
    clientSecret: "e5e13f4d75a3046aa4e1d581fc635702ceadc209",
    callbackURL: "https://nightlife-app-elisal.c9users.io/auth/github/callback"
}, function(accessToken, refreshToken, profile, done){
        //create user
        process.nextTick(function(){
            return done(null, profile);
        });
        /*User.findOne({ username: profile.id }, function (err, user){
            if (err) return done(err);
            return done(null, user);
        });*/
    }
));

//Asks for authorization
router.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));

//Github callback
router.get('/auth/github/callback', passport.authenticate('github', {failiureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
        console.log("you're logged in")
    });
module.exports = router;