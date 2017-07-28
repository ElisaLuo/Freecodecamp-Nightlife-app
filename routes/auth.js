const express = require('express');
const router = express.Router();
const GitHubStrategy = require('passport-github2');
const passport = require('passport');
const User = require('../models/user.model');
const Venue = require('../models/venue.model');

router.post('/', (req, res) => {
    
        //First check to see if user is attending that bar, if so decrement
        Venue.findOneAndUpdate({
            id: "bar",
            totalAttending: 1,
            usersAttending: req.user.username || req.user.displayName
        },
            { $set: { 'totalAttending': 0 } },
            { new: true },
            (err, venue) => {
                if (err) throw err;
                if (!venue) {
                    Venue.findOneAndUpdate({ id: "bar" },
                        { $inc: { 'totalAttending': 1 }, $addToSet: { 'usersAttending': req.user.username || req.user.displayName } },
                        { new: true },
                        (err, venue) => {
                            if (err) throw err;
                            res.send('done');
                        });
                } else {
                    res.send('done');
                }
            }
        );

  
});


router.get('/', passport.authenticate('github'));

//Passport setup
passport.use(new GitHubStrategy({
    clientID: "e5b156bfabd594e3ce1e",
    clientSecret: "e5e13f4d75a3046aa4e1d581fc635702ceadc209",
    callbackURL: "https://nightlife-app-elisal.c9users.io/auth/github/callback"
},
    (accessToken, refreshToken, profile, done) => {
        //create user
        User.findOne({ username: profile.username }, (err, user) => {
            if (err) return done(err);
            if (!user) {
                var newUser = new User({
                    username: profile.username,
                    displayName: profile.displayName
                }).save((err, user) => {
                    console.log('error');
                    if (err) throw err;
                    done(null, user);
                });
            } else {
                done(null, user);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


router.get('/callback', passport.authenticate('github', { failiureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
        console.log("you're logged in");
    });

module.exports = router;