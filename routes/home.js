const yelp = require('yelp-fusion');
const express = require('express');
const router = express.Router();
const token = "mIDOo4eFVacy6vFMkX9bvn8xfpWu7KW5B-JoREY_CVQN-xnk6LaD6MmRWp5BWWsYx0ME5cdUgd8qbYkkFb09k_zArvbxR1VqqYh37o1KeZMvyBV3aV5jG54WXdR0WXYx";
const client = yelp.client(token);
const request = require('request');
const Venue = require('../models/venue.model');

function getVenues (bars){
    var arr=[];
    return new Promise((resolve, reject) => {
        var filledArray = bars.jsonBody.businesses.length;
        bars.jsonBody.businesses.map((eachBar) => {
            Venue.findOne({
                id: eachBar.id,
                title: eachBar.name,
                image: eachBar.image_url,
                url: eachBar.url,
                rating: eachBar.rating,
                address: eachBar.location.address1 + ", " + eachBar.location.city + ", " + eachBar.location.state + ", " + eachBar.location.country + "  " + eachBar.location.zip_code,
                phone: eachBar.phone.slice(0, 2) + " (" + eachBar.phone.slice(2, 5) + ") " + eachBar.phone.slice(5, 8) + "-" + eachBar.phone.slice(8, 12),
                price: eachBar.price
            }, (err, venue) => {
                if (err) reject(err)
                //Create Venue if it doesn't exist.
                if (!venue) {
                    var newVenue = new Venue({
                        id: eachBar.id,
                        title: eachBar.name,
                        image: eachBar.image_url,
                        url: eachBar.url,
                        rating: eachBar.rating,
                        address: eachBar.location.address1 + ", " + eachBar.location.city + ", " + eachBar.location.state + ", " + eachBar.location.country + "  " + eachBar.location.zip_code,
                        phone: eachBar.phone.slice(0, 2) + " (" + eachBar.phone.slice(2, 5) + ") " + eachBar.phone.slice(5, 8) + "-" + eachBar.phone.slice(8, 12),
                        price: eachBar.price
                    }).save((err, venue) => {
                        if (err) reject(err)
                        arr.push(venue);
                        if (arr.length === filledArray) {
                            resolve(arr);
                        }
                    })
                } else {
                    arr.push(venue);
                    if (arr.length === filledArray) {
                        resolve(arr);
                    }
                }
            });
        });
    });
}
function titleCase(str) {
var rawString = str.toLowerCase().split(" ");
  var upperCase = [];
  for(var i = 0; i < rawString.length; i++){
    upperCase.push(rawString[i][0].toUpperCase() + rawString[i].substring(1, rawString[i].length));
  }
  return upperCase.join(" ");
}
router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Credentials', true);
    request.get('http://ipinfo.io/' + req.headers['x-forwarded-for'], {json: true}, function (e, r){
        client.search({
            term: "chinese",
            latitude:r.body.loc.split(",")[0],
            longitude: r.body.loc.split(",")[1]
        }).then(bars => {
            getVenues(bars).then(function(result){
                res.render('home', {
                    bars: result,
                    term: 'Chinese restaurants near you',
                    authenticated: req.isAuthenticated()
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
                console.log(err);
            });
    });
});
router.get('/search', function(req, res){
    client.search({
        term: "chinese",
        location: req.query.location
    }).then(bars => {
        getVenues(bars).then(function(result){
            res.render('home', {
                bars: result,
                term: 'Chinese restaurants in ' + titleCase(req.query.location),
                authenticated: req.isAuthenticated()
            });
        });
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;