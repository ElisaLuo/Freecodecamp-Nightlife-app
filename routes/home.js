const yelp = require('yelp-fusion');
const express = require('express');
const router = express.Router();
const token = "mIDOo4eFVacy6vFMkX9bvn8xfpWu7KW5B-JoREY_CVQN-xnk6LaD6MmRWp5BWWsYx0ME5cdUgd8qbYkkFb09k_zArvbxR1VqqYh37o1KeZMvyBV3aV5jG54WXdR0WXYx";
const client = yelp.client(token);
const request = require('request');
const Venue = require('../models/venue.model');

router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Credentials', true);
    request.get('http://ipinfo.io/' + req.headers['x-forwarded-for'], {json: true}, function (e, r){
        client.search({
            term: "bars",
            latitude:r.body.loc.split(",")[0],
            longitude: r.body.loc.split(",")[1]
        }).then(response => {
            response.jsonBody.businesses.map((eachBar) => {
                Venue.findOne({
                    id: eachBar.id,
                    title: eachBar.name
                }, (err, venue) => {
                    if(err) return (err);
                    if(!venue){
                        var newVenue = new Venue({
                            id: eachBar.id,
                            title: eachBar.name
                        }).save((err, venue) => {
                            if(err) return err;
                        })
                    }
                })
            })
            res.render('home', {
                bars: response.jsonBody.businesses,
                term: 'Bars near you',
                authenticated: req.isAuthenticated()
            });
            console.log(req.isAuthenticated());
        });
    });
});
router.get('/search', function(req, res){
    client.search({
        term: "bars",
        location: req.query.location
    }).then(response => {
        response.jsonBody.businesses.map((eachBar) => {
                Venue.findOne({
                    id: eachBar.id,
                    title: eachBar.name
                }, (err, venue) => {
                    if(err) return (err);
                    if(!venue){
                        var newVenue = new Venue({
                            id: eachBar.id,
                            title: eachBar.name
                        }).save((err, venue) => {
                            if(err) return err;
                        })
                    }
                })
            })
        res.render('home', {
            bars: response.jsonBody.businesses,
            term: 'Bars in ' + req.query.location,
            authenticated: req.isAuthenticated()
        });
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;