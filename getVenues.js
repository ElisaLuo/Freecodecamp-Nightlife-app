const Venue = require('./models/venue.model');


module.exports = function getVenues(bars) {
    var arr = [];
    return new Promise((resolve, reject) => {
        var filledArray = bars.businesses.length;
        bars.businesses.map((eachBar) => {
            Venue.findOne({
                id: eachBar.id,
                title: eachBar.name,
                image: eachBar.image_url,
                link: eachBar.mobile_url,
                snippet: eachBar.snippet_text,
            }, (err, venue) => {
                if (err) reject(err)
                //Create Venue if it doesn't exist.
                if (!venue) {
                    var newVenue = new Venue({
                        id: eachBar.id,
                        title: eachBar.name,
                        image: eachBar.image_url,
                        link: eachBar.mobile_url,
                        snippet: eachBar.snippet_text,
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