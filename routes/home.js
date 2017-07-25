const yelp = require('yelp-fusion');
const express = require('express');
const router = express.Router();
const token = "mIDOo4eFVacy6vFMkX9bvn8xfpWu7KW5B-JoREY_CVQN-xnk6LaD6MmRWp5BWWsYx0ME5cdUgd8qbYkkFb09k_zArvbxR1VqqYh37o1KeZMvyBV3aV5jG54WXdR0WXYx";
const client = yelp.client(token);
const request = require('request');



router.get('/', function (req, res) {
    request.get('http://ipinfo.io/' + req.headers['x-forwarded-for'], {json: true}, function (e, r){
        client.search({
            term: "bars",
            latitude:r.body.loc.split(",")[0],
            longitude: r.body.loc.split(",")[1]
        }).then(response => {
            res.render('home', {
                bars: response.jsonBody.businesses
            });
        });
    });
});
router.get('/:place', function(req, res){
    client.search({
        term: "bars",
        location: req.params.place
    }).then(response => {
        res.render('home', {
            bars: response.jsonBody.businesses
        });
    });
});


module.exports = router;